import { isRef, toRefName } from '../../generate/helpers/ref.ts'
import type {
  TypeSystemArgs,
  RefToResolved,
  TypeSystem
} from '../../generate/types.ts'
import type { OasRefData, Stringable } from '@schematicos/types'
import { P, match } from 'ts-pattern'
import type { ContextData } from './ContextData.ts'
import invariant from 'tiny-invariant'
import { Import } from '../../generate/elements/Import.ts'
import { normalize } from 'path'
import type { Settings } from '../../generate/settings/Settings.ts'
import { Definition } from 'generate/elements/Definition.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'
import type { Reporter } from 'core/lib/Reporter.ts'

const MAX_LOOKUPS = 10

export type FileContents = {
  imports: Map<string, Set<string>>
  definitions: Map<string, Stringable>
  content: Stringable[]
}

export type ContentFn = (context: GenerateContext) => Stringable | undefined

type ConstructorArgs = {
  data: ContextData
  reporter: Reporter
}

export type RegisterArgs =
  | {
      imports: Import[]
      destinationPath: string
    }
  | {
      definition: Definition
      destinationPath: string
    }
  | {
      definitions: Definition[]
      destinationPath: string
    }
  | {
      content: Stringable
      destinationPath: string
    }

export class GenerateContext {
  private contextData: ContextData
  private reporter: Reporter

  private constructor({ data, reporter }: ConstructorArgs) {
    this.contextData = data
    this.reporter = reporter
  }

  static create(args: ConstructorArgs) {
    return new GenerateContext(args)
  }

  render(): Record<string, string> {
    if (this.contextData.rendering) {
      throw new Error('Render already in progress')
    }

    this.contextData.rendering = true

    const fileEntries = Array.from(this.files.entries()).map(
      ([destination, file]): [string, string] => {
        const imports = Array.from(file.imports.entries()).map(
          ([module, importNamesSet]) => {
            return Import.create(module, Array.from(importNamesSet))
          }
        )

        const fileContents = [
          imports,
          Array.from(file.definitions.values()),
          file.content
        ]
          .filter((section): section is Stringable[] =>
            Boolean(section?.length)
          )
          .map(section => section.join('\n'))
          .join('\n\n')

        return [destination, fileContents]
      }
    )

    return Object.fromEntries(fileEntries)
  }

  getFile(filePath: string): FileContents {
    const normalisedPath = normalize(filePath)

    const currentFile = this.contextData.files.get(normalisedPath)

    if (!currentFile) {
      return this.addFile(normalisedPath)
    }

    return currentFile
  }

  mutationEnabled(): boolean {
    return !this.contextData.rendering
  }

  register({ destinationPath, ...args }: RegisterArgs) {
    invariant(this.mutationEnabled(), 'Cannot mutate files during rendering')

    const currentFile = this.getFile(destinationPath)

    match(args)
      .with({ imports: P.nonNullable }, ({ imports }) => {
        imports.forEach(importItem => {
          const module = currentFile.imports.get(importItem.module)

          if (!module) {
            currentFile.imports.set(
              importItem.module,
              new Set(importItem.importNames.map(n => `${n}`))
            )
          } else {
            importItem.importNames.forEach(n => module.add(`${n}`))
          }
        })
      })
      .with({ definitions: P.nonNullable }, ({ definitions }) => {
        definitions.forEach(definition => {
          currentFile.definitions.set(`${definition.identifier}`, definition)
        })
      })
      .with({ definition: P.nonNullable }, ({ definition }) => {
        currentFile.definitions.set(`${definition.identifier}`, definition)
      })
      .with({ content: P.nonNullable }, ({ content }) => {
        currentFile.content.push(content)
      })
      .exhaustive()
  }

  resolveRefSingle<T extends OasRefData>(arg: T): RefToResolved<T> | T {
    const c = this.contextData.schemaModel.components

    const refName = toRefName(arg.$ref)

    const resolved = match(arg.refType)
      .with('schema', () => c?.models?.[refName])
      .with('requestBody', () => c?.requestBodies?.[refName])
      .with('parameter', () => c?.parameters?.[refName])
      .with('response', () => c?.responses?.[refName])
      .with('example', () => c?.examples?.[refName])
      .with('header', () => c?.headers?.[refName])
      .exhaustive()

    if (!resolved) {
      console.log(c?.models)
      throw new Error(`Ref "${arg.$ref}" not found`)
    }

    // Ensure that the ref type matches the expected type
    // Eg, 'response' refs should resolve to a 'response' object
    if (isRef(resolved)) {
      if (resolved.refType !== arg.refType) {
        throw new Error(
          `Ref type mismatch for "${arg.$ref}". Expected "${arg.refType}" but got "${resolved.refType}"`
        )
      }
    } else {
      if (resolved.schematicType !== arg.refType) {
        throw new Error(
          `Type mismatch for "${arg.$ref}". Expected "${arg.refType}" but got "${resolved.schematicType}"`
        )
      }
    }

    return resolved as RefToResolved<T> | T
  }

  resolveRef<T extends OasRefData>(
    arg: T,
    lookupsPerformed: number = 0
  ): RefToResolved<T> {
    if (lookupsPerformed >= MAX_LOOKUPS) {
      throw new Error('Max lookups reached')
    }

    const resolved = this.resolveRefSingle(arg)

    if (isRef(resolved)) {
      return this.resolveRef<T>(resolved as T, lookupsPerformed + 1)
    }

    return resolved as RefToResolved<T>
  }

  private addFile(normalisedPath: string) {
    invariant(this.mutationEnabled(), 'Cannot mutate files during rendering')

    if (this.contextData.files.has(normalisedPath)) {
      throw new Error(`File already exists: ${normalisedPath}`)
    }

    const newFile: FileContents = {
      imports: new Map(),
      definitions: new Map(),
      content: []
    }

    this.contextData.files.set(normalisedPath, newFile)

    return newFile
  }

  toTypeSystem({
    value,
    required,
    destinationPath
  }: Omit<TypeSystemArgs, 'context'>): Stringable {
    // if value is a ref
    if (isRef(value)) {
      // create a definition for it in its own source file
      const definition = Definition.fromRef({
        context: this,
        ref: value,
        destinationPath
      })

      // and add it to outputs
      this.register({ definition, destinationPath })

      // if the ref is defined outside of the file where it is used
      if (definition.isImported()) {
        // import it
        this.register({
          imports: [definition.identifier.toImport()],
          destinationPath
        })
      }
    }

    return this.contextData.typeSystem.create({
      value,
      required,
      destinationPath,
      context: this
    })
  }

  toInferType(value: Stringable) {
    return this.contextData.typeSystem.inferType({
      value,
      context: this
    })
  }

  unexpectedValue(message: string) {
    console.log(message)
  }

  report({ level, phase, trail, message }: ReportArgs): void {
    this.reporter.report({ level, phase, trail, message })
  }

  get schemaModel(): OasDocument {
    return this.contextData.schemaModel
  }

  get settings(): Settings {
    return this.contextData.settings
  }

  get typeSystemInfo(): Omit<TypeSystem, 'create'> {
    const { create: _create, ...rest } = this.contextData.typeSystem

    return rest
  }

  get files(): Map<string, FileContents> {
    return this.contextData.files
  }
}

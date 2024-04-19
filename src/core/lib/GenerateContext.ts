import { isRef, toRefName } from '../../generate/helpers/ref.ts'
import type { RefToResolved, TypeSystem } from '../../generate/types.ts'
import type { OasRefData, Stringable } from '@schematicos/types'
import { P, match } from 'ts-pattern'
import type { Import } from '../../generate/elements/Import.ts'
import { normalize } from 'path'
import type { Settings } from '../../generate/settings/Settings.ts'
import { Definition } from 'generate/elements/Definition.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'
import type { Reporter } from 'core/lib/Reporter.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasVoid } from 'parse/elements/schema/Void.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'

const MAX_LOOKUPS = 10

export type FileContents = {
  imports: Map<string, Set<string>>
  definitions: Map<string, Stringable>
  content: Stringable[]
}

type ConstructorArgs = {
  schemaModel: OasDocument
  settings: Settings
  typeSystem: TypeSystem
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

export type ToTypeSystemArgs = {
  value: OasSchema | OasRef<'schema'> | OasVoid
  required: boolean | undefined
  destinationPath: string
}

export class GenerateContext {
  files: Map<string, FileContents>
  schemaModel: OasDocument
  settings: Settings
  typeSystem: TypeSystem
  private reporter: Reporter

  private constructor({
    schemaModel,
    settings,
    typeSystem,
    reporter
  }: ConstructorArgs) {
    this.files = new Map()
    this.schemaModel = schemaModel
    this.settings = settings
    this.typeSystem = typeSystem
    this.reporter = reporter
  }

  static create(args: ConstructorArgs) {
    return new GenerateContext(args)
  }

  getFile(filePath: string): FileContents {
    const normalisedPath = normalize(filePath)

    const currentFile = this.files.get(normalisedPath)

    if (!currentFile) {
      return this.addFile(normalisedPath)
    }

    return currentFile
  }

  register({ destinationPath, ...args }: RegisterArgs) {
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
    const c = this.schemaModel.components

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

  addFile(normalisedPath: string) {
    if (this.files.has(normalisedPath)) {
      throw new Error(`File already exists: ${normalisedPath}`)
    }

    const newFile: FileContents = {
      imports: new Map(),
      definitions: new Map(),
      content: []
    }

    this.files.set(normalisedPath, newFile)

    return newFile
  }

  toTypeSystem(
    { value, required, destinationPath }: ToTypeSystemArgs,
    coreContext: CoreContext
  ): Stringable {
    // if value is a ref
    if (isRef(value)) {
      // create a definition for it in its own source file
      const definition = Definition.fromRef({
        context: coreContext,
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

    return this.typeSystem.create({
      value,
      required,
      destinationPath,
      context: coreContext
    })
  }

  toInferType(value: Stringable, coreContext: CoreContext) {
    return this.typeSystem.inferType({
      value,
      context: coreContext
    })
  }

  report({ level, phase, trail, message }: ReportArgs): void {
    this.reporter.report({ level, phase, trail, message })
  }

  get typeSystemInfo(): Omit<TypeSystem, 'create'> {
    const { create: _create, ...rest } = this.typeSystem

    return rest
  }
}

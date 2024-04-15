import { isRef, toRefName } from '../helpers/ref.ts'
import type { TypeSystemArgs, RefToResolved, TypeSystem } from '../types.ts'
import type { Method, OasRef, OasRoot, OasSchemaRef, Stringable } from '@schematicos/types'
import { match } from 'ts-pattern'
import type { ContextData } from './ContextData.ts'
import invariant from 'tiny-invariant'
import { Import } from '../elements/Import.ts'
import { Model } from '../elements/Model.ts'
import { normalize } from 'path'
import type { Settings } from "./Settings.ts";

const MAX_LOOKUPS = 10

export type FileContents = {
  imports: Map<string, Set<string>>
  models: Map<string, Stringable>
  content: Stringable[]
}

export type ContentFn = (context: GenerateContext) => Stringable | undefined

type ConstructorArgs = {
  data: ContextData
  filePath?: string
}

type RegisterImportArgs = {
  importItem: Import
  destinationPath: string
}

type RegisterImportsArgs = {
  importItems: Import[]
  destinationPath: string
}

type RegisterRefArgs = {
  ref: OasSchemaRef
  destinationPath: string
}

type RegisterContentArgs = {
  content: Stringable
  destinationPath: string
}

type ReportArgs = {
  message: string
} & (
  | {
      location: 'operation'
      method: Method
      path: string
    }
  | {
      location: 'schema'
      ref: string
    }
)

export class GenerateContext {
  private contextData: ContextData

  constructor({ data }: ConstructorArgs) {
    this.contextData = data
  }

  render(): Record<string, string> {
    console.log('Start rendering')

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
          Array.from(file.models.values()),
          file.content
        ]
          .filter((section): section is Stringable[] => Boolean(section?.length))
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

  mutationEnabled():boolean {
    return !this.contextData.rendering
  }

  registerImport({ importItem, destinationPath }: RegisterImportArgs) {
    invariant(this.mutationEnabled(), 'Cannot mutate files during rendering')

    const currentFile = this.getFile(destinationPath)

    const module = currentFile.imports.get(importItem.module)

    if (!module) {
      currentFile.imports.set(
        importItem.module,
        new Set(importItem.importNames.map(n => `${n}`))
      )
    } else {
      importItem.importNames.forEach(n => module.add(`${n}`))
    }
  }

  registerImports({ importItems, destinationPath }: RegisterImportsArgs) {
    invariant(this.mutationEnabled(), 'Cannot mutate files during rendering')

    importItems.forEach(importItem => {
      this.registerImport({ importItem, destinationPath })
    })
  }

  registerModel(model: Model) {
    const { destinationPath } = model

    const currentFile = this.getFile(destinationPath)

    const { identifier } = model

    currentFile.models.set(identifier.toString(), model)
  }

  private registerRef({ ref, destinationPath }: RegisterRefArgs) {
    const model = Model.fromRef({
      context: this,
      ref,
      destinationPath
    })

    if (model.isImported()) {
      this.registerImport({
        importItem: model.identifier.toImport(),
        destinationPath
      })
    }

    this.registerModel(model)
  }

  registerContent({ content, destinationPath }: RegisterContentArgs) {
    invariant(this.mutationEnabled(), 'Cannot mutate files during rendering')

    const currentFile = this.getFile(destinationPath)

    currentFile.content.push(content)
  }

  resolveRefSingle<T extends OasRef>(arg: T): RefToResolved<T> | T {
    const c = this.contextData.schemaModel.components

    const refName = toRefName(arg.$ref)

    const resolved = match(arg.refType)
      .with('schema', () => c?.models?.[refName])
      .with('pathItem', () => c?.pathItems?.[refName])
      .with('requestBody', () => c?.requestBodies?.[refName])
      .with('parameter', () => c?.parameters?.[refName])
      .with('response', () => c?.responses?.[refName])
      .with('example', () => c?.examples?.[refName])
      .with('header', () => c?.headers?.[refName])
      .exhaustive()

    if (!resolved) {
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

  resolveRef<T extends OasRef>(
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
      models: new Map(),
      content: []
    }

    this.contextData.files.set(normalisedPath, newFile)

    return newFile
  }

  toTypeSystem({
    value,
    required,
    destinationPath
  }: Omit<TypeSystemArgs, 'context'>):Stringable {
    if (isRef(value)) {
      this.registerRef({
        ref: value,
        destinationPath
      })
    }

    return this.contextData.typeSystem.create({
      value,
      required,
      destinationPath,
      context: this
    })
  }

  unexpectedValue(message: string) {
    console.log(message)
  }

  report(args: ReportArgs): void {
    console.log(args)
  }

  get schemaModel(): OasRoot {
    return this.contextData.schemaModel
  }

  get settings(): Settings {
    return this.contextData.settings
  }

  get typeSystemInfo(): Omit<TypeSystem, 'create'>{
    const { create:_create, ...rest } = this.contextData.typeSystem

    return rest
  }

  get files():Map<string, FileContents> {
    return this.contextData.files
  }
}

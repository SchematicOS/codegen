import {
  SettingsConfigType,
  OasRoot,
  PrettierConfigType,
  OasRef,
  Stringable,
  LoadedTransformer,
  LoadedTypeSystem,
  ImportName
} from '@schematicos/types'
import { match } from 'ts-pattern'
import {
  DefinitionType,
  Identifier,
  RefToResolved,
  toRefName
} from '@schematicos/generate'

export type RegisterImportArgs = {
  destination: string
  identifier: Identifier
}

export type RegisterImportsArgs = {
  imports: Record<string, ImportName[]>
  destination: string
}

export type RegisterDefinitionArgs = {
  destination: string
  definition: DefinitionType
}

export type RegisterContentArgs = {
  destination: string
  content: Stringable
}

export type FileContents = {
  imports: Map<string, Identifier>
  definitions: Map<string, DefinitionType>
  content: Stringable[]
}

type ConstructorArgs = {
  schemaModel: OasRoot
  settingsConfig: SettingsConfigType
  prettierConfig?: PrettierConfigType
  transformers: LoadedTransformer[]
  typeSystem: LoadedTypeSystem
}

export class GenerateContext {
  files: Map<string, FileContents>
  schemaModel: OasRoot
  settingsConfig: SettingsConfigType
  prettierConfig?: PrettierConfigType
  transformers: LoadedTransformer[]
  typeSystem: LoadedTypeSystem

  constructor({
    schemaModel,
    settingsConfig,
    prettierConfig,
    transformers,
    typeSystem
  }: ConstructorArgs) {
    this.files = new Map()
    this.schemaModel = schemaModel
    this.transformers = transformers
    this.typeSystem = typeSystem
    this.settingsConfig = settingsConfig
    this.prettierConfig = prettierConfig
  }

  registerImport({ identifier, destination }: RegisterImportArgs) {
    if (!this.files.has(destination)) {
      this.files.set(destination, {
        imports: new Map<string, Identifier>(),
        definitions: new Map<string, DefinitionType>(),
        content: []
      })
    }

    this.files
      .get(destination)
      ?.imports?.set(identifier.toImportName(), identifier)
  }

  registerImports({ imports, destination }: RegisterImportsArgs) {
    Object.entries(imports).forEach(([importModule, importNames]) => {
      importNames.forEach(importName => {
        this.registerImport({
          destination,
          identifier: Identifier.fromStatic({
            name: importName,
            module: importModule,
            ctx: this
          })
        })
      })
    })
  }

  registerDefinition({ destination, definition }: RegisterDefinitionArgs) {
    if (!this.files.has(destination)) {
      this.files.set(destination, {
        imports: new Map<string, Identifier>(),
        definitions: new Map<string, DefinitionType>(),
        content: []
      })
    }

    this.files
      .get(destination)
      ?.definitions?.set(definition.identifier.toImportName(), definition)
  }

  registerContent({ destination, content }: RegisterContentArgs) {
    if (!this.files.has(destination)) {
      this.files.set(destination, {
        imports: new Map<string, Identifier>(),
        definitions: new Map<string, DefinitionType>(),
        content: []
      })
    }

    this.files.get(destination)?.content.push(content)
  }

  resolveRef<T extends OasRef>(arg: T): RefToResolved<T> {
    const c = this.schemaModel.components

    const refName = toRefName(arg.$ref)

    const item = match(arg.refType)
      .with('schema', () => c?.models?.[refName])
      .with('pathItem', () => c?.pathItems?.[refName])
      .with('requestBody', () => c?.requestBodies?.[refName])
      .with('parameter', () => c?.parameters?.[refName])
      .with('response', () => c?.responses?.[refName])
      .with('example', () => c?.examples?.[refName])
      .with('header', () => c?.headers?.[refName])
      .exhaustive()

    if (!item || item.schematicType === 'ref') {
      console.log('ITEM IS NOT VALUE')
      console.log(arg)
      console.log(item)

      throw new Error('Not value')
    }

    return item as RefToResolved<T>
  }

  unexpectedValue(message: string) {
    console.log(message)
  }
}

import type { TypeSystem } from '../schematic-types/plugins.ts'
import type { Stringable } from '../dsl/Stringable.ts'
import { Import, type ImportNameArg } from '../dsl/Import.ts'
import { normalize } from '@std/path'
import type { Settings } from '../settings/Settings.ts'
import { Definition } from '../dsl/Definition.ts'
import type { OasDocument } from '../oas-elements/Document.ts'
import type { ReportArgs } from './Reporter.ts'
import type { Reporter } from './Reporter.ts'
import type { OasSchema } from '../oas-schema/types.ts'
import type { OasRef } from '../oas-elements/Ref.ts'
import type { OasVoid } from '../oas-schema/Void.ts'
import type { CoreContext } from './CoreContext.ts'
import { Identifier } from '../dsl/Identifier.ts'

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

export type RegisterArgs = {
  imports?: Record<string, ImportNameArg | ImportNameArg[]>
  definitions?: Definition[]
  content?: Stringable
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

  static create(args: ConstructorArgs): GenerateContext {
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

  register({
    imports = {},
    definitions,
    content,
    destinationPath
  }: RegisterArgs) {
    const currentFile = this.getFile(destinationPath)

    Object.entries(imports).forEach(([importModule, importNames]) => {
      const module = currentFile.imports.get(importModule)

      const importItem = Import.create(importModule, importNames)

      if (!module) {
        currentFile.imports.set(
          importModule,
          new Set(importItem.importNames.map(n => `${n}`))
        )
      } else {
        importItem.importNames.forEach(n => module.add(`${n}`))
      }
    })

    definitions?.forEach(definition => {
      currentFile.definitions.set(`${definition.identifier}`, definition)
    })

    if (content) {
      currentFile.content.push(content)
    }
  }

  addFile(normalisedPath: string): FileContents {
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
    context: CoreContext
  ): Stringable {
    // if value is a ref
    if (value.isRef()) {
      // create a definition for it in its own source file
      const identifier = Identifier.from$Ref({
        $ref: value.$ref,
        context
      })

      const resolved = value.resolveOnce()

      const definition = Definition.fromValue({
        context,
        identifier,
        value: resolved,
        description: resolved.description,
        destinationPath: identifier.modelSettings.getExportPath()
      })

      // and add it to outputs
      this.register({
        definitions: [definition],
        destinationPath: identifier.modelSettings.getExportPath()
      })

      // if the ref is defined outside of the file where it is used
      if (identifier.isImported(destinationPath)) {
        // import it
        this.register({
          imports: definition.identifier.toImport().toRecord(),
          destinationPath
        })
      }
    }

    return this.typeSystem.create({
      value,
      required,
      destinationPath,
      context
    })
  }

  toInferType(value: Stringable, coreContext: CoreContext): Stringable {
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

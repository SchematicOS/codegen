import type { FileContents } from './GenerateContext.ts'
import type { Settings } from '../../generate/settings/Settings.ts'
import type { TypeSystem } from '../../generate/types.ts'
import type { OasDocument } from 'parse/elements/Document.ts'

type ConstructorArgs = {
  files: Map<string, FileContents>
  schemaModel: OasDocument
  settings: Settings
  typeSystem: TypeSystem
}

export class ContextData {
  rendering: boolean
  files: Map<string, FileContents>
  schemaModel: OasDocument
  settings: Settings
  typeSystem: TypeSystem

  constructor({
    files = new Map(),
    schemaModel,
    settings,
    typeSystem
  }: ConstructorArgs) {
    this.rendering = false
    this.files = files
    this.schemaModel = schemaModel
    this.typeSystem = typeSystem
    this.settings = settings
  }
}

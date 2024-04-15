import type { FileContents } from './GenerateContext.ts'
import type { Settings } from './Settings.ts'
import type { TypeSystem } from '../types.ts'
import type { OasRoot } from 'npm:@schematicos/types@0.0.34'

type ConstructorArgs = {
  files: Map<string, FileContents>
  schemaModel: OasRoot
  settings: Settings
  typeSystem: TypeSystem
}

export class ContextData {
  rendering: boolean
  files: Map<string, FileContents>
  schemaModel: OasRoot
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

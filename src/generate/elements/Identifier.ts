import type { CoreContext } from 'core/lib/CoreContext.ts'
import { toRefName } from '../helpers/ref.ts'
import { Import } from './Import.ts'
import { normalize } from 'path'
import type { ModelSettings } from '../settings/ModelSettings.ts'
import type { Stringable } from '@schematicos/types'
import type { EntityType } from 'typescript/EntityType.ts'

type IdentifierArgs = {
  name: string
  sourcePath: string
  modelSettings: ModelSettings
  type: EntityType
  context: CoreContext
}

type From$RefArgs = {
  $ref: string
  context: CoreContext
}

export class Identifier implements Stringable {
  name: string
  /** source is where Identifier is defined */
  sourcePath: string
  modelSettings: ModelSettings
  type: EntityType
  context: CoreContext

  private constructor({
    name,
    sourcePath,
    modelSettings,
    type,
    context
  }: IdentifierArgs) {
    this.name = name
    this.sourcePath = sourcePath
    this.modelSettings = modelSettings
    this.type = type
    this.context = context
  }

  static create({
    name,
    sourcePath,
    modelSettings,
    type,
    context
  }: IdentifierArgs): Identifier {
    return new Identifier({
      name,
      sourcePath,
      modelSettings,
      type,
      context
    })
  }

  static from$Ref({ $ref, context }: From$RefArgs): Identifier {
    const { type, formatIdentifier } = context.typeSystemInfo
    const modelSettings = context.settings.getModelSettings($ref)

    const name = modelSettings.getRenameTo() || toRefName($ref)
    const sourcePath = modelSettings.getExportPath()

    return Identifier.create({
      name: formatIdentifier(name),
      sourcePath,
      modelSettings,
      type,
      context
    })
  }

  toImport(): Import {
    return Import.create(this.sourcePath, this.name)
  }

  isImported(destination: string): boolean {
    // Normalize paths to ensure comparison is accurate
    return normalize(this.sourcePath) !== normalize(destination)
  }

  toString(): string {
    return this.name
  }
}

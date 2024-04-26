import type { CoreContext } from '../context/CoreContext.ts'
import { toRefName } from '../helpers/ref.ts'
import { Import } from './Import.ts'
import { normalize } from '@std/path'
import type { ModelSettings } from '../settings/ModelSettings.ts'
import type { Stringable } from '../schematicTypes/stringable.ts'
import type { EntityType } from '../typescript/EntityType.ts'

type IdentifierArgs = {
  name: string
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
  modelSettings: ModelSettings
  type: EntityType
  context: CoreContext

  private constructor({ name, modelSettings, type, context }: IdentifierArgs) {
    this.name = name
    this.modelSettings = modelSettings
    this.type = type
    this.context = context
  }

  static create({
    name,
    modelSettings,
    type,
    context
  }: IdentifierArgs): Identifier {
    return new Identifier({
      name,
      modelSettings,
      type,
      context
    })
  }

  static from$Ref({ $ref, context }: From$RefArgs): Identifier {
    const { type, formatIdentifier } = context.typeSystemInfo
    const modelSettings = context.settings.getModelSettings($ref)

    const name = modelSettings.getRenameTo() || toRefName($ref)

    return Identifier.create({
      name: formatIdentifier(name),
      modelSettings,
      type,
      context
    })
  }

  toImport(): Import {
    return Import.create(this.modelSettings.getExportPath(), this.name)
  }

  isImported(destination: string): boolean {
    // Normalize paths to ensure comparison is accurate
    return (
      normalize(this.modelSettings.getExportPath()) !== normalize(destination)
    )
  }

  toString(): string {
    return this.name
  }
}

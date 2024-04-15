import type { GenerateContext } from '../lib/GenerateContext.ts'
import { toRefName } from '../helpers/ref.ts'
import { Import } from './Import.ts'
import { normalize } from 'path'
import type { ModelSettings } from '../lib/ModelSettings.ts'
import type { Stringable } from '@schematicos/types'
import { capitalize } from 'generate/helpers/strings.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { ZodInferType } from 'zod/lib/ZodInferType.ts'

export type IdentifierType = 'value' | 'type'

type IdentifierArgs = {
  name: string
  source: string
  modelSettings: ModelSettings
  type: IdentifierType
  context: GenerateContext
}

type From$RefArgs = {
  $ref: string
  context: GenerateContext
}

export class Identifier implements Stringable {
  name: string
  /** source is where Identifier is defined */
  source: string
  modelSettings: ModelSettings
  type: IdentifierType
  context: GenerateContext

  private constructor({
    name,
    source,
    modelSettings,
    type,
    context
  }: IdentifierArgs) {
    this.name = name
    this.source = source
    this.modelSettings = modelSettings
    this.type = type
    this.context = context
  }

  static create({
    name,
    source,
    modelSettings,
    type,
    context
  }: IdentifierArgs): Identifier {
    return new Identifier({
      name,
      source,
      modelSettings,
      type,
      context
    })
  }

  static from$Ref({ $ref, context }: From$RefArgs): Identifier {
    const { type, formatIdentifier } = context.typeSystemInfo
    const modelSettings = context.settings.getModelSettings($ref)

    const name = modelSettings.getRenameTo() || toRefName($ref)
    const source = modelSettings.getExportPath()

    return Identifier.create({
      name: formatIdentifier(name),
      source,
      modelSettings,
      type,
      context
    })
  }

  toImport(): Import {
    return Import.create(this.source, this.name)
  }

  isImported(destination: string): boolean {
    // Normalize paths to ensure comparison is accurate
    return normalize(this.source) !== normalize(destination)
  }

  toType() {
    const typeIdentifier = Identifier.create({
      name: capitalize(this.name),
      source: this.source,
      modelSettings: this.modelSettings,
      type: 'type',
      context: this.context
    })

    const typeDefinition = Definition.create({
      identifier: typeIdentifier,
      value: ZodInferType.create({
        context: this.context,
        value: this
      }),
      destinationPath: this.source,
      context: this.context
    })

    this.context.registerDefinition(typeDefinition)

    return typeIdentifier
  }

  toString(): string {
    return this.name
  }
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from 'core/lib/ParseContext.ts'
import type { Trail } from 'core/lib/Trail.ts'

export type DiscriminatorFields = {
  propertyName: string
}

type ToDiscriminatorV3Args = {
  fields: DiscriminatorFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasDiscriminator extends OasBase {
  schematicType: 'discriminator' = 'discriminator'
  fields: DiscriminatorFields

  private constructor({
    fields,
    trail,
    skipped,
    context
  }: ToDiscriminatorV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToDiscriminatorV3Args) {
    return new OasDiscriminator({ fields, trail, context, skipped })
  }

  get propertyName() {
    return this.fields.propertyName
  }
}

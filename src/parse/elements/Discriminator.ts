import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasDiscriminator } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToDiscriminatorV3Args = {
  fields: Omit<OasDiscriminator, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Discriminator extends OasBase {
  schematicType: 'discriminator' = 'discriminator'
  fields: Omit<OasDiscriminator, 'schematicType'>

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
    return new Discriminator({ fields, trail, context, skipped })
  }

  get propertyName() {
    return this.fields.propertyName
  }
}

import { OasBase } from './OasBase.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import type { Trail } from 'context/Trail.ts'

export type DiscriminatorFields = {
  propertyName: string
}

type ToDiscriminatorV3Args = {
  fields: DiscriminatorFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
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

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToDiscriminatorV3Args): OasDiscriminator {
    return new OasDiscriminator({ fields, trail, context, skipped })
  }

  get propertyName(): string {
    return this.fields.propertyName
  }
}

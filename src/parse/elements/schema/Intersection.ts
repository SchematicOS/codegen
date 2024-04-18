import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasDiscriminator } from 'parse/elements/Discriminator.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

export type IntersectionFields = {
  title?: string
  description?: string
  discriminator?: OasDiscriminator
  members: (OasSchema | OasRef<'schema'>)[]
}

type ToIntersectionV3Args = {
  fields: IntersectionFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasIntersection extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'intersection' = 'intersection'
  fields: IntersectionFields

  private constructor({
    fields,
    trail,
    skipped,
    context
  }: ToIntersectionV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToIntersectionV3Args) {
    return new OasIntersection({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }

  get discriminator() {
    return this.fields.discriminator
  }

  get members() {
    return this.fields.members
  }
}

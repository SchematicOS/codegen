import { OasBase } from '../oas-elements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasDiscriminator } from '../oas-elements/Discriminator.ts'
import type { OasRef } from '../oas-elements/Ref.ts'
import type { OasSchema } from './types.ts'

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

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToIntersectionV3Args): OasIntersection {
    return new OasIntersection({ fields, trail, context, skipped })
  }

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get discriminator(): OasDiscriminator | undefined {
    return this.fields.discriminator
  }

  get members(): (OasSchema | OasRef<'schema'>)[] {
    return this.fields.members
  }

  isRef(): this is OasRef<'schema'> {
    return false
  }

  resolve(): OasIntersection {
    return this
  }
}

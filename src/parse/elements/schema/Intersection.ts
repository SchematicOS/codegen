import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasIntersectionData } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToIntersectionV3Args = {
  fields: Omit<OasIntersectionData, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Intersection extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'intersection' = 'intersection'
  fields: Omit<OasIntersectionData, 'schematicType' | 'type'>

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
    return new Intersection({ fields, trail, context, skipped })
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

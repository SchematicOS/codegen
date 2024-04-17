import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasUnion } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToUnionV3Args = {
  fields: Omit<OasUnion, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Union extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'union' = 'union'
  fields: Omit<OasUnion, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToUnionV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToUnionV3Args) {
    return new Union({ fields, trail, context, skipped })
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

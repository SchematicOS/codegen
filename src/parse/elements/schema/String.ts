import type { OasStringData } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToStringV3Args = {
  fields: Omit<OasStringData, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class StringOas extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'string' = 'string'
  fields: Omit<OasStringData, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToStringV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToStringV3Args) {
    return new StringOas({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }

  get format() {
    return this.fields.format
  }

  get pattern() {
    return this.fields.pattern
  }

  get enums() {
    return this.fields.enums
  }
}

import type { OasInteger } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToIntegerV3Args = {
  fields: Omit<OasInteger, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class IntegerOas extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'integer' = 'integer'
  fields: Omit<OasInteger, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToIntegerV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToIntegerV3Args) {
    return new IntegerOas({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

export type IntegerFields = {
  title?: string
  description?: string
}

type ToIntegerV3Args = {
  fields: IntegerFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasInteger extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'integer' = 'integer'
  fields: IntegerFields

  private constructor({ fields, trail, skipped, context }: ToIntegerV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToIntegerV3Args) {
    return new OasInteger({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

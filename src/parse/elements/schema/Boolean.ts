import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

export type BooleanFields = {
  title?: string
  description?: string
}

type ToBooleanV3Args = {
  fields: BooleanFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasBoolean extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'boolean' = 'boolean'
  fields: BooleanFields

  private constructor({ fields, trail, skipped, context }: ToBooleanV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToBooleanV3Args) {
    return new OasBoolean({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

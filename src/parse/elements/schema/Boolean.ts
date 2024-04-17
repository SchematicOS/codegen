import type { OasBooleanData } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToBooleanV3Args = {
  fields: Omit<OasBooleanData, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class BooleanOas extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'boolean' = 'boolean'
  fields: Omit<OasBooleanData, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToBooleanV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToBooleanV3Args) {
    return new BooleanOas({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasHeaderData } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'

type ToHeaderV3Args = {
  fields: Omit<OasHeaderData, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Header extends OasBase implements OasHeaderData {
  schematicType: 'header' = 'header'
  fields: Omit<OasHeaderData, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToHeaderV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToHeaderV3Args) {
    return new Header({ fields, trail, context, skipped })
  }

  get description() {
    return this.fields.description
  }

  get required() {
    return this.fields.required
  }

  get deprecated() {
    return this.fields.deprecated
  }

  get allowEmptyValue() {
    return this.fields.allowEmptyValue
  }

  get schema() {
    return this.fields.schema
  }

  get examples() {
    return this.fields.examples
  }

  get content() {
    return this.fields.content
  }
}

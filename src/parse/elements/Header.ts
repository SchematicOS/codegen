import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type {
  OasExampleData,
  OasExampleRefData,
  OasSchemaData,
  OasSchemaRefData
} from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasMediaType } from 'parse/elements/MediaType.ts'

export type HeaderFields = {
  description: string | undefined
  required: boolean | undefined
  deprecated: boolean | undefined
  allowEmptyValue: boolean | undefined
  schema: OasSchemaData | OasSchemaRefData | undefined
  examples: Record<string, OasExampleData | OasExampleRefData> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToHeaderV3Args = {
  fields: HeaderFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasHeader extends OasBase {
  schematicType: 'header' = 'header'
  fields: HeaderFields

  private constructor({ fields, trail, skipped, context }: ToHeaderV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToHeaderV3Args) {
    return new OasHeader({ fields, trail, context, skipped })
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

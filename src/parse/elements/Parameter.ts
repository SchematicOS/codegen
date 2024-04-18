import { OasBase } from 'parse/elements/OasBase.ts'
import type {
  OasExampleData,
  OasExampleRefData,
  OasParameterLocation,
  OasSchemaData,
  OasSchemaRefData
} from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasMediaType } from 'parse/elements/MediaType.ts'

export type ParameterFields = {
  name: string
  location: OasParameterLocation
  description: string | undefined
  required: boolean | undefined
  deprecated: boolean | undefined
  allowEmptyValue: boolean | undefined
  schema: OasSchemaData | OasSchemaRefData | undefined
  examples: Record<string, OasExampleData | OasExampleRefData> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToParameterV3Args = {
  fields: ParameterFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasParameter extends OasBase {
  schematicType: 'parameter' = 'parameter'
  fields: ParameterFields

  private constructor({ fields, trail, skipped, context }: ToParameterV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToParameterV3Args) {
    return new OasParameter({ fields, trail, context, skipped })
  }

  get name() {
    return this.fields.name
  }

  get location() {
    return this.fields.location
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

import { OasBase } from 'parse/elements/OasBase.ts'
import type {
  OasExampleData,
  OasExampleRefData,
  OasSchemaData,
  OasSchemaRefData
} from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

export type MediaTypeFields = {
  mediaType: string
  schema: OasSchemaData | OasSchemaRefData | undefined
  examples: Record<string, OasExampleData | OasExampleRefData> | undefined
}

type ToMediaTypeV3Args = {
  fields: MediaTypeFields
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class OasMediaType extends OasBase {
  schematicType: 'mediaType' = 'mediaType'
  fields: MediaTypeFields

  private constructor({ fields, trail, skipped, context }: ToMediaTypeV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToMediaTypeV3Args) {
    return new OasMediaType({ fields, trail, context, skipped })
  }

  get mediaType() {
    return this.fields.mediaType
  }

  get schema() {
    return this.fields.schema
  }

  get examples() {
    return this.fields.examples
  }
}

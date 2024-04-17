import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasMediaTypeItem } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToMediaTypeV3Args = {
  fields: Omit<OasMediaTypeItem, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class MediaType extends OasBase {
  schematicType: 'mediaType' = 'mediaType'
  fields: Omit<OasMediaTypeItem, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToMediaTypeV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToMediaTypeV3Args) {
    return new MediaType({ fields, trail, context, skipped })
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

import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasExample } from 'parse/elements/Example.ts'

export type MediaTypeFields = {
  mediaType: string
  schema: OasSchema | OasRef<'schema'> | undefined
  examples: Record<string, OasExample | OasRef<'example'>> | undefined
}

type ToMediaTypeV3Args = {
  fields: MediaTypeFields
  trail: Trail
  context: CoreContext
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

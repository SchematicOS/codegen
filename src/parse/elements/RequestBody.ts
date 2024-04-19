import { OasBase } from 'parse/elements/OasBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { OasMediaType } from 'parse/elements/MediaType.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

export type RequestBodyFields = {
  description: string | undefined
  content: Record<string, OasMediaType>
  required: boolean | undefined
}

type ToRequestBodyV3Args = {
  fields: RequestBodyFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasRequestBody extends OasBase {
  schematicType: 'requestBody' = 'requestBody'
  fields: RequestBodyFields

  private constructor({
    fields,
    trail,
    skipped,
    context
  }: ToRequestBodyV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToRequestBodyV3Args) {
    return new OasRequestBody({ fields, trail, context, skipped })
  }

  get description() {
    return this.fields.description
  }

  get content() {
    return this.fields.content
  }

  get required() {
    return this.fields.required
  }

  isRef(): this is OasRef<'requestBody'> {
    return false
  }

  resolve() {
    return this
  }

  toSchema(
    mediaType: string = 'application/json'
  ): OasSchema | OasRef<'schema'> | undefined {
    return this.fields.content?.[mediaType]?.schema
  }
}

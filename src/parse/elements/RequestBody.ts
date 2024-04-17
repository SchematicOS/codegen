import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { MediaType } from 'parse/elements/MediaType.ts'

export type RequestBodyFields = {
  description: string | undefined
  content: Record<string, MediaType>
  required: boolean | undefined
}

type ToRequestBodyV3Args = {
  fields: RequestBodyFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class RequestBody extends OasBase {
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
    return new RequestBody({ fields, trail, context, skipped })
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
}

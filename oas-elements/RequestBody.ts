import { OasBase } from './OasBase.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Trail } from '../context/Trail.ts'
import type { OasMediaType } from './MediaType.ts'
import type { OasRef } from './Ref.ts'
import type { OasSchema } from '../oas-schema/types.ts'

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

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToRequestBodyV3Args): OasRequestBody {
    return new OasRequestBody({ fields, trail, context, skipped })
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get content(): Record<string, OasMediaType> {
    return this.fields.content
  }

  get required(): boolean | undefined {
    return this.fields.required
  }

  isRef(): this is OasRef<'requestBody'> {
    return false
  }

  resolve(): OasRequestBody {
    return this
  }

  toSchema(
    mediaType: string = 'application/json'
  ): OasSchema | OasRef<'schema'> | undefined {
    return this.fields.content?.[mediaType]?.schema
  }
}

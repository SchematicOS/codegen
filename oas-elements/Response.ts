import { OasBase } from './OasBase.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Trail } from '../context/Trail.ts'
import type { OasHeader } from './Header.ts'
import type { OasMediaType } from './MediaType.ts'
import type { OasRef } from './Ref.ts'
import type { OasSchema } from '../oas-schema/types.ts'

export type ResponseFields = {
  description: string | undefined
  headers: Record<string, OasHeader | OasRef<'header'>> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToResponseV3Args = {
  fields: ResponseFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasResponse extends OasBase {
  schematicType: 'response' = 'response'
  fields: ResponseFields

  private constructor({ fields, trail, skipped, context }: ToResponseV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToResponseV3Args): OasResponse {
    return new OasResponse({ fields, trail, context, skipped })
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get headers(): Record<string, OasHeader | OasRef<'header'>> | undefined {
    return this.fields.headers
  }

  get content(): Record<string, OasMediaType> | undefined {
    return this.fields.content
  }

  isRef(): this is OasRef<'response'> {
    return false
  }

  resolve(): OasResponse {
    return this
  }

  toSchema(
    mediaType: string = 'application/json'
  ): OasSchema | OasRef<'schema'> | undefined {
    return this.fields.content?.[mediaType]?.schema
  }
}

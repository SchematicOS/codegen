import type { OasHeaderRefData } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { OasHeader } from 'parse/elements/Header.ts'
import type { OasMediaType } from 'parse/elements/MediaType.ts'

export type ResponseFields = {
  description: string | undefined
  headers: Record<string, OasHeader | OasHeaderRefData> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToResponseV3Args = {
  fields: ResponseFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasResponse extends OasBase {
  schematicType: 'response' = 'response'
  fields: ResponseFields

  private constructor({ fields, trail, skipped, context }: ToResponseV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToResponseV3Args) {
    return new OasResponse({ fields, trail, context, skipped })
  }

  get description() {
    return this.fields.description
  }

  get headers() {
    return this.fields.headers
  }

  get content() {
    return this.fields.content
  }
}

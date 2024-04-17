import type { OasResponseData } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToResponseV3Args = {
  fields: Omit<OasResponseData, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Response extends OasBase {
  schematicType: 'response' = 'response'
  fields: Omit<OasResponseData, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToResponseV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToResponseV3Args) {
    return new Response({ fields, trail, context, skipped })
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

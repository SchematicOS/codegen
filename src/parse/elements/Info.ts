import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasInfo } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToInfoV3Args = {
  fields: Omit<OasInfo, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Info extends OasBase {
  schematicType: 'info' = 'info'
  fields: Omit<OasInfo, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToInfoV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToInfoV3Args) {
    return new Info({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }

  get termsOfService() {
    return this.fields.termsOfService
  }

  get contact() {
    return this.fields.contact
  }

  get license() {
    return this.fields.license
  }

  get version() {
    return this.fields.version
  }
}

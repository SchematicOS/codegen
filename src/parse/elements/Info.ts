import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasContactData, OasLicenseData } from '@schematicos/types'
import type { Trail } from 'core/lib/Trail.ts'
import type { ParseContext } from 'core/lib/ParseContext.ts'

export type InfoFields = {
  title: string
  version: string
  description: string | undefined
  termsOfService: string | undefined
  contact: OasContactData | undefined
  license: OasLicenseData | undefined
}

type ToInfoV3Args = {
  fields: InfoFields
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class OasInfo extends OasBase {
  schematicType: 'info' = 'info'
  fields: InfoFields

  private constructor({ fields, trail, skipped, context }: ToInfoV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToInfoV3Args) {
    return new OasInfo({ fields, trail, context, skipped })
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

import { OasBase } from './OasBase.ts'
import type { OasContactData, OasLicenseData } from '@schematicos/types'
import type { Trail } from 'context/Trail.ts'
import type { CoreContext } from 'context/CoreContext.ts'

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
  context: CoreContext
  skipped: Record<string, unknown>
}

export class OasInfo extends OasBase {
  schematicType: 'info' = 'info'
  fields: InfoFields

  private constructor({ fields, trail, skipped, context }: ToInfoV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToInfoV3Args): OasInfo {
    return new OasInfo({ fields, trail, context, skipped })
  }

  get title(): string {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get termsOfService(): string | undefined {
    return this.fields.termsOfService
  }

  get contact(): OasContactData | undefined {
    return this.fields.contact
  }

  get license(): OasLicenseData | undefined {
    return this.fields.license
  }

  get version(): string {
    return this.fields.version
  }
}

import type { OasContactData, OasLicenseData } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { OasInfo } from 'parse/elements/Info.ts'
import type { InfoFields } from 'parse/elements/Info.ts'

type ToInfoV3Args = {
  info: OpenAPIV3.InfoObject
  trail: Trail
  context: CoreContext
}

export const toInfoV3 = ({ info, trail, context }: ToInfoV3Args): OasInfo => {
  const {
    title,
    description,
    termsOfService,
    contact,
    license,
    version,
    ...skipped
  } = info

  const fields: InfoFields = {
    title,
    description,
    termsOfService,
    contact: contact ? toContact(contact) : undefined,
    license: license ? toLicense(license) : undefined,
    version
  }

  return OasInfo.create({ fields, trail, skipped, context })
}

const toLicense = (license: OpenAPIV3.LicenseObject): OasLicenseData => ({
  schematicType: 'license',
  identifier: undefined,
  ...license
})

const toContact = (contact: OpenAPIV3.ContactObject): OasContactData => ({
  schematicType: 'contact',
  ...contact
})

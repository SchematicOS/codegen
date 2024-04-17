import type { OasContact, OasInfo, OasLicense } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Info } from 'parse/elements/Info.ts'

type ToInfoV3Args = {
  info: OpenAPIV3.InfoObject
  trail: Trail
  context: ParseContext
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

  const fields = stripUndefined({
    title,
    description,
    termsOfService,
    contact: contact ? toContact(contact) : undefined,
    license: license ? toLicense(license) : undefined,
    version
  })

  return Info.create({ fields, trail, skipped, context })
}

const toLicense = (license: OpenAPIV3.LicenseObject): OasLicense => ({
  schematicType: 'license',
  identifier: undefined,
  ...license
})

const toContact = (contact: OpenAPIV3.ContactObject): OasContact => ({
  schematicType: 'contact',
  ...contact
})

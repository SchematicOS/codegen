/* eslint-disable no-restricted-imports */
import type { OpenAPIV3 } from 'openapi-types'
import type {
  OasRoot,
  OasInfo,
  OasLicense,
  OasContact
} from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toTagsV3 } from './toTagsV3.ts'
import { toOperationsV3 } from './toOperationsV3.ts'
import { toComponentsV3 } from './components/toComponentsV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Document } from 'parse/elements/Document.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'

type FromInfoV3Args = {
  info: OpenAPIV3.InfoObject
  trail: Trail
  context: ParseContext
}

const fromInfoV3 = ({ info, context }: FromInfoV3Args): OasInfo => {
  const {
    title,
    description,
    termsOfService,
    contact,
    license,
    version,
    ...skipped
  } = info

  context.notImplemented({ section: 'OPENAPI_V3_INFO', skipped })

  return {
    schematicType: 'info',
    title,
    description,
    termsOfService,
    contact: contact ? toContact(contact) : undefined,
    license: license ? toLicense(license) : undefined,
    version
  }
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

type FromDocumentV3Args = {
  document: OpenAPIV3.Document
  trail: Trail
  context: ParseContext
}

export const fromDocumentV3 = ({
  document,
  trail,
  context
}: FromDocumentV3Args): OasRoot => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  const fields = stripUndefined({
    schematicType: 'openapi',
    openapi,
    info: fromInfoV3({ info, trail: trail.add('info'), context }),
    operations: toOperationsV3({
      paths,
      trail: trail.add('paths'),
      context
    }),
    components: components
      ? toComponentsV3({
          components,
          trail: trail.add('components'),
          context
        })
      : undefined,
    tags: tags
      ? toTagsV3({ tags, trail: trail.add('tags'), context })
      : undefined
  })

  return Document.create({ fields, trail, context, skipped })
}

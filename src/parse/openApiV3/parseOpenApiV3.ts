/* eslint-disable no-restricted-imports */
import type { OpenAPIV3 } from 'openapi-types'
import type {
  OasPathItem,
  OasRoot,
  OasInfo,
  OasLicense,
  OasContact
} from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { toParameterListV3 } from './toParameterV3.ts'
import { toTagsV3 } from './toTagsV3.ts'
import { toOperationsV3 } from './toOperationsV3.ts'
import { toComponentsV3 } from './toComponentsV3.ts'

export const toPathItem = (
  pathItem: OpenAPIV3.PathItemObject,
  ctx: ParseContextType
): OasPathItem => {
  const { $ref, summary, description, parameters, ...skipped } = pathItem

  ctx.notImplemented({ section: 'OPENAPI_V3_PATH_ITEM', skipped })

  return {
    schematicType: 'pathItem',
    $ref,
    summary,
    description,
    parameters: parameters ? toParameterListV3(parameters, ctx) : undefined
  }
}

export type ToExamplesV3Args = {
  example: OpenAPIV3.ExampleObject | undefined
  examples:
    | Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>
    | undefined
  exampleKey: string
}

const fromInfoV3 = (
  info: OpenAPIV3.InfoObject,
  ctx: ParseContextType
): OasInfo => {
  const {
    title,
    description,
    termsOfService,
    contact,
    license,
    version,
    ...skipped
  } = info

  ctx.notImplemented({ section: 'OPENAPI_V3_INFO', skipped })

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

export const fromDocumentV3 = (
  document: OpenAPIV3.Document,
  ctx: ParseContextType
): OasRoot => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  ctx.notImplemented({ section: 'OPENAPI_V3_DOCUMENT', skipped })

  return {
    schematicType: 'openapi',
    openapi,
    info: fromInfoV3(info, ctx),
    operations: toOperationsV3(paths, ctx),
    components: components ? toComponentsV3(components, ctx) : undefined,
    tags: tags ? toTagsV3(tags, ctx) : undefined
  }
}

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

type ToPathItemV3Args = {
  pathItem: OpenAPIV3.PathItemObject
  path: string[]
  context: ParseContextType
}

export const toPathItem = ({
  pathItem,
  path,
  context
}: ToPathItemV3Args): OasPathItem => {
  const { $ref, summary, description, parameters, ...skipped } = pathItem

  context.notImplemented({ section: 'OPENAPI_V3_PATH_ITEM', skipped })

  return {
    schematicType: 'pathItem',
    $ref,
    summary,
    description,
    parameters: parameters
      ? toParameterListV3({
          parameters,
          path: path.concat('parameters'),
          context
        })
      : undefined
  }
}

export type ToExamplesV3Args = {
  example: OpenAPIV3.ExampleObject | undefined
  examples:
    | Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>
    | undefined
  exampleKey: string
}

type FromInfoV3Args = {
  info: OpenAPIV3.InfoObject
  path: string[]
  context: ParseContextType
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
  path: string[]
  context: ParseContextType
}

export const fromDocumentV3 = ({
  document,
  path,
  context
}: FromDocumentV3Args): OasRoot => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  context.notImplemented({ section: 'OPENAPI_V3_DOCUMENT', skipped })

  return {
    schematicType: 'openapi',
    openapi,
    info: fromInfoV3({ info, path: path.concat('info'), context }),
    operations: toOperationsV3({
      paths,
      path: path.concat('operations'),
      context
    }),
    components: components
      ? toComponentsV3({ components, path: path.concat('components'), context })
      : undefined,
    tags: tags ? toTagsV3(tags, context) : undefined
  }
}

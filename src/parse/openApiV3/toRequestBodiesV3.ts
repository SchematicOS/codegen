import type { OpenAPIV3 } from 'openapi-types'
import type { OasRequestBody, OasRequestBodyRef } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import { toContentV3 } from './toContentV3.ts'

type ToRequestBodyV3Args = {
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  path: string[]
  context: ParseContextType
}

export const toRequestBodyV3 = ({
  requestBody,
  path,
  context
}: ToRequestBodyV3Args): OasRequestBody | OasRequestBodyRef => {
  if (isRef(requestBody)) {
    return toRefV31(requestBody, 'requestBody', context)
  }

  const { description, content, required, ...skipped } = requestBody

  context.notImplemented({ section: 'OPENAPI_V3_REQUEST_BODY', skipped })

  return {
    schematicType: 'requestBody',
    description,
    content: toContentV3({ content, path: path.concat('content'), context }),
    required
  }
}

type ToRequestBodiesV3Args = {
  requestBodies: Record<
    string,
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  >
  path: string[]
  context: ParseContextType
}

export const toRequestBodiesV3 = ({
  requestBodies,
  path,
  context
}: ToRequestBodiesV3Args): Record<
  string,
  OasRequestBody | OasRequestBodyRef
> => {
  return Object.fromEntries(
    Object.entries(requestBodies).map(([key, value]) => {
      return [
        key,
        toRequestBodyV3({ requestBody: value, path: path.concat(key), context })
      ]
    })
  )
}

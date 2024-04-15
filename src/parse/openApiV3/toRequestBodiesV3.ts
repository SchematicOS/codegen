import type { OpenAPIV3 } from 'openapi-types'
import type { OasRequestBody, OasRequestBodyRef } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import { toContentV3 } from './toContentV3.ts'

export const toRequestBodyV3 = (
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ctx: ParseContextType
): OasRequestBody | OasRequestBodyRef => {
  if (isRef(requestBody)) {
    return toRefV31(requestBody, 'requestBody', ctx)
  }

  const { description, content, required, ...skipped } = requestBody

  ctx.notImplemented({ section: 'OPENAPI_V3_REQUEST_BODY', skipped })

  return {
    schematicType: 'requestBody',
    description,
    content: toContentV3(content, ctx),
    required
  }
}

export const toRequestBodiesV3 = (
  requestBodies: Record<
    string,
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  >,
  ctx: ParseContextType
): Record<string, OasRequestBody | OasRequestBodyRef> => {
  return Object.fromEntries(
    Object.entries(requestBodies).map(([key, value]) => {
      return [key, toRequestBodyV3(value, ctx)]
    })
  )
}

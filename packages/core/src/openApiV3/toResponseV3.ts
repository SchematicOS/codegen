import { toContentV3, toRefV31 } from '@/openApiV3/parseOpenApiV3.ts'
import { toHeadersV3 } from '@/openApiV3/toHeaderV3.ts'
import { ParseContextType } from '@/types.ts'
import { isRef } from '@/util/isRef.ts'
import { stripUndefined } from '@/util/stripUndefined.ts'
import { OasResponse, OasResponseRef } from '@schematicos/types'
import { OpenAPIV3 } from 'openapi-types'

export const toResponsesV3 = (
  responses: OpenAPIV3.ResponsesObject,
  ctx: ParseContextType
): Record<string, OasResponseRef | OasResponse> => {
  return Object.fromEntries(
    Object.entries(responses).map(([key, value]) => {
      return [key, toResponseV3(value, ctx)]
    })
  )
}

export const toResponseV3 = (
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject,
  ctx: ParseContextType
): OasResponse | OasResponseRef => {
  if (isRef(response)) {
    return toRefV31(response, 'response', ctx)
  }

  const { description, headers, content, ...skipped } = response

  ctx.notImplemented({ section: 'OPENAPI_V3_RESPONSE', skipped })

  const out = stripUndefined({
    schematicType: 'response',
    description,
    headers: headers ? toHeadersV3(headers, ctx) : undefined,
    content: content ? toContentV3(content, ctx) : undefined
  }) as OasResponse

  return out
}

import { toContentV3 } from './toContentV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toHeadersV3 } from './toHeaderV3.ts'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import { stripUndefined } from '../util/stripUndefined.ts'
import type { OasResponse, OasResponseRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'

type ToResponsesV3Args = {
  responses: OpenAPIV3.ResponsesObject
  path: string[]
  context: ParseContextType
}

export const toResponsesV3 = ({
  responses,
  path,
  context
}: ToResponsesV3Args): Record<string, OasResponseRef | OasResponse> => {
  return Object.fromEntries(
    Object.entries(responses).map(([key, value]) => {
      return [
        key,
        toResponseV3({ response: value, path: path.concat(key), context })
      ]
    })
  )
}

type ToResponseV3Args = {
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject
  path: string[]
  context: ParseContextType
}

export const toResponseV3 = ({
  response,
  path,
  context
}: ToResponseV3Args): OasResponse | OasResponseRef => {
  if (isRef(response)) {
    return toRefV31(response, 'response', context)
  }

  const { description, headers, content, ...skipped } = response

  context.notImplemented({ section: 'OPENAPI_V3_RESPONSE', skipped })

  const out = stripUndefined({
    schematicType: 'response',
    description,
    headers: headers
      ? toHeadersV3({ headers, path: path.concat('headers'), context })
      : undefined,
    content: content
      ? toContentV3({ content, path: path.concat('content'), context })
      : undefined
  }) as OasResponse

  return out
}

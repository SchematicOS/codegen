import { toRefV31 } from './toRefV31.ts'
import { toHeadersV3 } from './toHeadersV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import { stripUndefined } from '../util/stripUndefined.ts'
import type { OasResponse, OasResponseRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'parse/lib/Trail.ts'
import { toMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { Response } from 'parse/elements/Response.ts'

type ToResponsesV3Args = {
  responses: OpenAPIV3.ResponsesObject
  trail: Trail
  context: ParseContext
}

export const toResponsesV3 = ({
  responses,
  trail,
  context
}: ToResponsesV3Args): Record<string, OasResponseRef | OasResponse> => {
  return Object.fromEntries(
    Object.entries(responses).map(([key, value]) => {
      return [
        key,
        toResponseV3({ response: value, trail: trail.add(key), context })
      ]
    })
  )
}

type ToResponseV3Args = {
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject
  trail: Trail
  context: ParseContext
}

export const toResponseV3 = ({
  response,
  trail,
  context
}: ToResponseV3Args): OasResponse | OasResponseRef => {
  if (isRef(response)) {
    return toRefV31({ ref: response, refType: 'response', trail, context })
  }

  const { description, headers, content, ...skipped } = response

  const fields = stripUndefined({
    description,
    headers: headers
      ? toHeadersV3({ headers, trail: trail.add('headers'), context })
      : undefined,
    content: content
      ? toMediaTypeItemsV3({ content, trail: trail.add('content'), context })
      : undefined
  })

  return Response.create({ fields, trail, skipped, context })
}

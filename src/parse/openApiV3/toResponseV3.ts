import { toRefV31 } from './toRefV31.ts'
import { toHeadersV3 } from './toHeadersV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import { stripUndefined } from '../util/stripUndefined.ts'
import type { OasResponseData, OasResponseRefData } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'parse/lib/Trail.ts'
import { toOptionalMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
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
}: ToResponsesV3Args): Record<string, Response | OasResponseRefData> => {
  return Object.fromEntries(
    Object.entries(responses).map(([key, value]) => {
      return [
        key,
        toResponseV3({ response: value, trail: trail.add(key), context })
      ]
    })
  )
}

type ToOptionalResponsesV3Args = {
  responses: OpenAPIV3.ResponsesObject | undefined
  trail: Trail
  context: ParseContext
}

export const toOptionalResponsesV3 = ({
  responses,
  trail,
  context
}: ToOptionalResponsesV3Args):
  | Record<string, OasResponseRefData | OasResponseData>
  | undefined => {
  if (!responses) {
    return undefined
  }

  return toResponsesV3({ responses, trail, context })
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
}: ToResponseV3Args): Response | OasResponseRefData => {
  if (isRef(response)) {
    return toRefV31({ ref: response, refType: 'response', trail, context })
  }

  const { description, headers, content, ...skipped } = response

  const fields = stripUndefined({
    description,
    headers: toHeadersV3({ headers, trail: trail.add('headers'), context }),
    content: toOptionalMediaTypeItemsV3({
      content,
      trail: trail.add('content'),
      context
    })
  })

  return Response.create({ fields, trail, skipped, context })
}

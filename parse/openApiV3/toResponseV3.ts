import { toRefV31 } from './toRefV31.ts'
import { toHeadersV3 } from './toHeadersV3.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import { isRef } from 'parse/util/isRef.ts'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'context/Trail.ts'
import { toOptionalMediaTypeItemsV3 } from './toMediaTypeItemV3.ts'
import { OasResponse } from 'parse/elements/Response.ts'
import type { ResponseFields } from 'parse/elements/Response.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

type ToResponsesV3Args = {
  responses: OpenAPIV3.ResponsesObject
  trail: Trail
  context: CoreContext
}

export const toResponsesV3 = ({
  responses,
  trail,
  context
}: ToResponsesV3Args): Record<string, OasResponse | OasRef<'response'>> => {
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
  context: CoreContext
}

export const toOptionalResponsesV3 = ({
  responses,
  trail,
  context
}: ToOptionalResponsesV3Args):
  | Record<string, OasResponse | OasRef<'response'>>
  | undefined => {
  if (!responses) {
    return undefined
  }

  return toResponsesV3({ responses, trail, context })
}

type ToResponseV3Args = {
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject
  trail: Trail
  context: CoreContext
}

export const toResponseV3 = ({
  response,
  trail,
  context
}: ToResponseV3Args): OasResponse | OasRef<'response'> => {
  if (isRef(response)) {
    return toRefV31({ ref: response, refType: 'response', trail, context })
  }

  const { description, headers, content, ...skipped } = response

  const fields: ResponseFields = {
    description,
    headers: toHeadersV3({ headers, trail: trail.add('headers'), context }),
    content: toOptionalMediaTypeItemsV3({
      content,
      trail: trail.add('content'),
      context
    })
  }

  return OasResponse.create({ fields, trail, skipped, context })
}

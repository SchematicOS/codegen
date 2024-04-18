import type { OpenAPIV3 } from 'openapi-types'
import type { OasRequestBodyRefData } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { toMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { OasRequestBody } from 'parse/elements/RequestBody.ts'
import type { RequestBodyFields } from 'parse/elements/RequestBody.ts'

type ToRequestBodyV3Args = {
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined
  trail: Trail
  context: ParseContext
}

export const toRequestBodyV3 = ({
  requestBody,
  trail,
  context
}: ToRequestBodyV3Args): OasRequestBody | OasRequestBodyRefData | undefined => {
  if (!requestBody) {
    return undefined
  }

  if (isRef(requestBody)) {
    return toRefV31({
      ref: requestBody,
      refType: 'requestBody',
      trail,
      context
    })
  }

  const { description, content, required, ...skipped } = requestBody

  const fields: RequestBodyFields = {
    description,
    content: toMediaTypeItemsV3({
      content,
      trail: trail.add('content'),
      context
    }),
    required
  }

  return OasRequestBody.create({
    fields,
    trail,
    skipped,
    context
  })
}

type ToRequestBodiesV3Args = {
  requestBodies:
    | Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject>
    | undefined
  trail: Trail
  context: ParseContext
}

export const toRequestBodiesV3 = ({
  requestBodies,
  trail,
  context
}: ToRequestBodiesV3Args):
  | Record<string, OasRequestBody | OasRequestBodyRefData>
  | undefined => {
  if (!requestBodies) {
    return undefined
  }

  const entries = Object.entries(requestBodies)
    .map(([key, value]) => {
      return [
        key,
        toRequestBodyV3({
          requestBody: value,
          trail: trail.add(key),
          context
        })
      ]
    })
    .filter(([, value]) => Boolean(value))

  return Object.fromEntries(entries)
}

import type { OpenAPIV3 } from 'openapi-types'
import type { OasRequestBody, OasRequestBodyRef } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { toMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { RequestBody } from 'parse/elements/RequestBody.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'

type ToRequestBodyV3Args = {
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  trail: Trail
  context: ParseContext
}

export const toRequestBodyV3 = ({
  requestBody,
  trail,
  context
}: ToRequestBodyV3Args): OasRequestBody | OasRequestBodyRef => {
  if (isRef(requestBody)) {
    return toRefV31({
      ref: requestBody,
      refType: 'requestBody',
      trail,
      context
    })
  }

  const { description, content, required, ...skipped } = requestBody

  const fields = stripUndefined({
    description,
    content: toMediaTypeItemsV3({
      content,
      trail: trail.add('content'),
      context
    }),
    required
  })

  return RequestBody.create({
    fields,
    trail,
    skipped,
    context
  })
}

type ToRequestBodiesV3Args = {
  requestBodies: Record<
    string,
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  >
  trail: Trail
  context: ParseContext
}

export const toRequestBodiesV3 = ({
  requestBodies,
  trail,
  context
}: ToRequestBodiesV3Args): Record<
  string,
  OasRequestBody | OasRequestBodyRef
> => {
  return Object.fromEntries(
    Object.entries(requestBodies).map(([key, value]) => {
      return [
        key,
        toRequestBodyV3({
          requestBody: value,
          trail: trail.add(key),
          context
        })
      ]
    })
  )
}

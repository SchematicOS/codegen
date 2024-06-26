import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from '../context/CoreContext.ts'
import { isRef } from '../helpers/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import type { Trail } from '../context/Trail.ts'
import { toMediaTypeItemsV3 } from './toMediaTypeItemV3.ts'
import { OasRequestBody } from '../oas-elements/RequestBody.ts'
import type { RequestBodyFields } from '../oas-elements/RequestBody.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

type ToRequestBodyV3Args = {
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined
  trail: Trail
  context: CoreContext
}

export const toRequestBodyV3 = ({
  requestBody,
  trail,
  context
}: ToRequestBodyV3Args): OasRequestBody | OasRef<'requestBody'> | undefined => {
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
  context: CoreContext
}

export const toRequestBodiesV3 = ({
  requestBodies,
  trail,
  context
}: ToRequestBodiesV3Args):
  | Record<string, OasRequestBody | OasRef<'requestBody'>>
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

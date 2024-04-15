import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import type { OasOperation, Method, OasPathItem } from 'npm:@schematicos/types@0.0.34'
import type { ParseContextType } from '../lib/types.ts'
import { toPathItem } from './parseOpenApiV3.ts'
import { toRequestBodyV3 } from './toRequestBodiesV3.ts'
import { toResponsesV3 } from './toResponseV3.ts'
import { stripUndefined } from '../util/stripUndefined.ts'
import { toParameterListV3 } from './toParameterV3.ts'

type OperationInfo = {
  method: Method
  path: string
  pathItem: OasPathItem
}

export const toOperationV3 = (
  operation: OpenAPIV3.OperationObject,
  operationInfo: OperationInfo,
  ctx: ParseContextType
): OasOperation => {
  const { method, path, pathItem } = operationInfo
  const {
    tags,
    summary,
    description,
    parameters,
    requestBody,
    responses,
    deprecated,
    ...skipped
  } = operation

  ctx.notImplemented({ section: 'OPENAPI_V3_OPERATION', skipped })

  return stripUndefined<OasOperation>({
    schematicType: 'operation',
    pathItem: pathItem,
    path,
    method,
    tags,
    summary,
    description,
    parameters: parameters ? toParameterListV3(parameters, ctx) : undefined,
    requestBody: requestBody ? toRequestBodyV3(requestBody, ctx) : undefined,
    responses: toResponsesV3(responses, ctx),
    deprecated
  })
}

export const toOperationsV3 = (
  paths: OpenAPIV3.PathsObject,
  ctx: ParseContextType
): OasOperation[] => {
  return Object.entries(paths).flatMap(([path, pathItem]) => {
    if (!pathItem) {
      return []
    }

    const {
      get,
      post,
      put,
      delete: deleteMethod,
      options,
      head,
      patch,
      trace,
      ...rest
    } = pathItem

    const pathItemObject = toPathItem(rest, ctx)

    const methodObjects = {
      get,
      post,
      put,
      delete: deleteMethod,
      options,
      head,
      patch,
      trace
    }

    return Object.entries(methodObjects)
      .map(([method, operation]) => {
        if (!operation) {
          return
        }

        return toOperationV3(
          operation,
          {
            method: method as Method,
            path,
            pathItem: pathItemObject
          },
          ctx
        )
      })
      .filter((item): item is OasOperation => Boolean(item))
  })
}

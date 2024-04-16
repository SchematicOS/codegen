import type { OpenAPIV3 } from 'openapi-types'
import type { OasOperation, Method, OasPathItem } from '@schematicos/types'
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

type ToOperationV3Args = {
  operation: OpenAPIV3.OperationObject
  operationInfo: OperationInfo
  path: string[]
  context: ParseContextType
}

export const toOperationV3 = ({
  operation,
  operationInfo,
  path: p,
  context
}: ToOperationV3Args): OasOperation => {
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

  context.notImplemented({ section: 'OPENAPI_V3_OPERATION', skipped })

  return stripUndefined<OasOperation>({
    schematicType: 'operation',
    pathItem: pathItem,
    path,
    method,
    tags,
    summary,
    description,
    parameters: parameters
      ? toParameterListV3({
          parameters,
          path: p.concat('parameters'),
          context
        })
      : undefined,
    requestBody: requestBody
      ? toRequestBodyV3({
          requestBody,
          path: p.concat('requstBody'),
          context
        })
      : undefined,
    responses: toResponsesV3({
      responses,
      path: p.concat('responses'),
      context
    }),
    deprecated
  })
}

type ToOperationsV3Args = {
  paths: OpenAPIV3.PathsObject
  path: string[]
  context: ParseContextType
}

export const toOperationsV3 = ({
  paths,
  path: p,
  context
}: ToOperationsV3Args): OasOperation[] => {
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

    const pathItemObject = toPathItem({
      pathItem: rest,
      path: p.concat('pathItem'),
      context
    })

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

        return toOperationV3({
          operation,
          operationInfo: {
            method: method as Method,
            path,
            pathItem: pathItemObject
          },
          path: p.concat([path, method]),
          context
        })
      })
      .filter((item): item is OasOperation => Boolean(item))
  })
}

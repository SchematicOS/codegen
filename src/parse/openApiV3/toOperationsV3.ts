import type { OpenAPIV3 } from 'openapi-types'
import type { OasOperation, Method, OasPathItem } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toRequestBodyV3 } from './toRequestBodiesV3.ts'
import { toResponsesV3 } from './toResponseV3.ts'
import { stripUndefined } from '../util/stripUndefined.ts'
import { toParameterListV3 } from './toParameterV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Operation } from 'parse/elements/Operation.ts'
import { toPathItemV3 } from 'parse/openApiV3/toPathItemV3.ts'

type OperationInfo = {
  method: Method
  path: string
  pathItem: OasPathItem
}

type ToOperationV3Args = {
  operation: OpenAPIV3.OperationObject
  operationInfo: OperationInfo
  trail: Trail
  context: ParseContext
}

export const toOperationV3 = ({
  operation,
  operationInfo,
  trail,
  context
}: ToOperationV3Args): OasOperation => {
  const { method, path, pathItem } = operationInfo
  const {
    operationId,
    tags,
    summary,
    description,
    parameters,
    requestBody,
    responses,
    deprecated,
    ...skipped
  } = operation

  const fields = stripUndefined<OasOperation>({
    schematicType: 'operation',
    pathItem: pathItem,
    path,
    method,
    operationId,
    summary,
    tags,
    description,
    parameters: parameters
      ? toParameterListV3({
          parameters,
          trail: trail.add('parameters'),
          context
        })
      : undefined,
    requestBody: requestBody
      ? toRequestBodyV3({
          requestBody,
          trail: trail.add('requestBody'),
          context
        })
      : undefined,
    responses: toResponsesV3({
      responses,
      trail: trail.add('responses'),
      context
    }),
    deprecated
  })

  return Operation.create({ fields, trail, context, skipped })
}

type ToOperationsV3Args = {
  paths: OpenAPIV3.PathsObject
  trail: Trail
  context: ParseContext
}

export const toOperationsV3 = ({
  paths,
  trail,
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

    const pathItemObject = toPathItemV3({
      pathItem: rest,
      trail: trail.addApiPath(path),
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
          trail: trail.addApiPath(path).addMethod(method),
          context
        })
      })
      .filter((item): item is OasOperation => Boolean(item))
  })
}

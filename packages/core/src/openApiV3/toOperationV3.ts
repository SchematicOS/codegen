import { toRequestBodyV3 } from '@/openApiV3/parseOpenApiV3.ts'
import { toResponsesV3 } from '@/openApiV3/toResponseV3.ts'
import { ParseContextType } from '@/types.ts'
import { stripUndefined } from '@/util/stripUndefined.ts'
import { Method, OasOperation, OasPathItem } from '@schematicos/types'
import { OpenAPIV3 } from 'openapi-types'
import { toParameterListV3 } from '@/openApiV3/toParameterV3.ts'

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

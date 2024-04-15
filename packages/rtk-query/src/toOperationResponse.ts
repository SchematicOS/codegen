import { toResponseName } from './util.ts'
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'
import { Model } from 'jsr:@schematicos/generate@0.0.2/Model'
import { Identifier } from 'jsr:@schematicos/generate@0.0.2/Identifier'
import { ModelSettings } from 'jsr:@schematicos/generate@0.0.2/ModelSettings'
import { isRef } from 'jsr:@schematicos/generate@0.0.2/ref'
import { toSuccessResponse } from 'jsr:@schematicos/generate@0.0.2/toSuccessResponse'
import type {
  OasOperation,
  OasResponse,
  OasResponseRef,
  OasSchema,
  OasSchemaRef,
  OasVoid
} from 'npm:@schematicos/types@0.0.34'
import { oasVoidValue } from 'npm:@schematicos/types@0.0.34'

type ToOperationResponseArgs = {
  context: GenerateContext
  operation: OasOperation
  destinationPath: string
}

export const toOperationResponse = ({
  context,
  operation,
  destinationPath
}: ToOperationResponseArgs) => {
  const modelSettings = ModelSettings.create({
    exportPath: destinationPath
  })

  const identifier = Identifier.create({
    name: toResponseName(operation),
    modelSettings,
    source: modelSettings.getExportPath(),
    type: context.typeSystemInfo.type,
    context
  })

  const successResponse = toSuccessResponse(operation)
  const value = toResponseValue({ context, response: successResponse })

  return Model.create({
    context,
    identifier,
    value,
    destinationPath
  })
}

type ToResponseValue = {
  context: GenerateContext
  response: OasResponse | OasResponseRef | undefined
}

const toResponseValue = ({
  context,
  response
}: ToResponseValue): OasSchema | OasSchemaRef | OasVoid => {
  if (!response) {
    return oasVoidValue
  }

  const resolvedResponse = isRef(response)
    ? context.resolveRef(response)
    : response

  const schema = resolvedResponse.content?.['application/json']?.schema

  return schema ?? oasVoidValue
}

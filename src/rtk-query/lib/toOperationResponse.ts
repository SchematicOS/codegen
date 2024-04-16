import { toResponseName } from './util.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import { toSuccessResponse } from 'generate/helpers/toSuccessResponse.ts'
import type {
  OasOperation,
  OasResponse,
  OasResponseRef,
  OasSchema,
  OasSchemaRef,
  OasVoid
} from '@schematicos/types'
import { oasVoidValue } from '@schematicos/types'

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
    settings: {
      exportPath: destinationPath,
      selected: true
    }
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

  return Definition.fromValue({
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

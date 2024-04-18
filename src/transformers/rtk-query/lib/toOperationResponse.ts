import { toResponseName } from './util.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import type {
  OasResponseRefData,
  OasSchemaData,
  OasSchemaRefData,
  OasVoid
} from '@schematicos/types'
import { oasVoidValue } from '@schematicos/types'
import { toSuccessResponse } from 'generate/helpers/toSuccessResponse.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasResponse } from 'parse/elements/Response.ts'

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
    sourcePath: modelSettings.getExportPath(),
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
  response: OasResponse | OasResponseRefData | undefined
}

const toResponseValue = ({
  context,
  response
}: ToResponseValue): OasSchemaData | OasSchemaRefData | OasVoid => {
  if (!response) {
    return oasVoidValue
  }

  const resolvedResponse = isRef(response)
    ? context.resolveRef(response)
    : response

  const schema = resolvedResponse.content?.['application/json']?.schema

  return schema ?? oasVoidValue
}

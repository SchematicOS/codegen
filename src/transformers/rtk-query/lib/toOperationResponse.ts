import { toResponseName } from './util.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasResponse } from 'parse/elements/Response.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

type ToOperationResponseArgs = {
  context: CoreContext
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

  const successResponse = operation.toSuccessResponse()
  const value = toResponseValue({ context, response: successResponse })

  return Definition.fromValue({
    context,
    identifier,
    value,
    destinationPath
  })
}

type ToResponseValue = {
  context: CoreContext
  response: OasResponse | OasRef<'response'> | undefined
}

const toResponseValue = ({
  context,
  response
}: ToResponseValue): OasSchema | OasRef<'schema'> | OasVoid => {
  if (!response) {
    return OasVoid.fromFields({ context })
  }

  const resolvedResponse = isRef(response)
    ? context.resolveRef(response)
    : response

  const schema = resolvedResponse.toSchema()

  return schema ?? OasVoid.fromFields({ context })
}

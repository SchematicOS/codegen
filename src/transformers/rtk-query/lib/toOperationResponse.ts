import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toResponseName } from 'generate/helpers/naming.ts'

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
    exportPath: destinationPath
  })

  const identifier = Identifier.create({
    name: toResponseName(operation),
    modelSettings,
    type: context.typeSystemInfo.type,
    context
  })

  const successResponse = operation.toSuccessResponse()

  return Definition.fromValue({
    context,
    identifier,
    value: successResponse?.resolve().toSchema() ?? OasVoid.empty(context),
    destinationPath
  })
}

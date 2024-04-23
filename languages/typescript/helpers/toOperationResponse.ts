import type { CoreContext } from 'context/CoreContext.ts'
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
  const identifier = Identifier.create({
    name: toResponseName(operation),
    modelSettings: ModelSettings.create({ exportPath: destinationPath }),
    type: context.typeSystemInfo.type,
    context
  })

  const successResponse = operation.toSuccessResponse()?.resolve()

  return Definition.fromValue({
    context,
    identifier,
    value: successResponse?.toSchema() ?? OasVoid.empty(context),
    description: successResponse?.description,
    destinationPath
  })
}

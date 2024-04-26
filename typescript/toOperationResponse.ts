import type { CoreContext } from '../context/CoreContext.ts'
import { Definition } from '../dsl/Definition.ts'
import { Identifier } from '../dsl/Identifier.ts'
import { ModelSettings } from '../settings/ModelSettings.ts'
import type { OasOperation } from '../oas-elements/Operation.ts'
import { OasVoid } from '../oas-schema/Void.ts'
import { toResponseName } from '../helpers/naming.ts'

type ToOperationResponseArgs = {
  context: CoreContext
  operation: OasOperation
  destinationPath: string
}

export const toOperationResponse = ({
  context,
  operation,
  destinationPath
}: ToOperationResponseArgs): Definition => {
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

import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasObject } from 'parse/elements/schema/Object.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toArgsName } from 'generate/helpers/naming.ts'
import isEmpty from 'lodash-es/isEmpty.js'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

type ToOperationArgArgs = {
  context: CoreContext
  destinationPath: string
  operation: OasOperation
}

export const toOperationArg = ({
  context,
  destinationPath,
  operation
}: ToOperationArgArgs) => {
  const identifier = Identifier.create({
    name: toArgsName(operation),
    modelSettings: ModelSettings.create({ exportPath: destinationPath }),
    type: context.typeSystemInfo.type,
    context
  })

  const body = operation.requestBody?.resolve().toSchema('application/json')

  const { properties, required } = toOperationArgProperties(operation, body)

  const value = isEmpty(properties)
    ? OasVoid.empty(context)
    : OasObject.fromFields({
        fields: { required, properties },
        context
      })

  return Definition.fromValue({
    context,
    identifier,
    value,
    destinationPath
  })
}

const toOperationArgProperties = (
  operation: OasOperation,
  body: OasSchema | OasRef<'schema'> | undefined
) => {
  const parameters = operation.parameters ?? []

  const resolved = parameters.map(parameter => parameter.resolve())

  // map property schemas by name
  const properties = resolved
    .map(parameter => [parameter.name, parameter.toSchema()])
    .concat(body ? [['body', body]] : [])

  // create list of required properties
  const required = resolved
    .filter(({ required }) => required)
    .map(({ name }) => name)
    .concat(body ? ['body'] : [])

  return {
    properties: Object.fromEntries(properties),
    required
  }
}

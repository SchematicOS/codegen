import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasObject } from 'parse/elements/schema/Object.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toArgsName } from 'generate/helpers/naming.ts'
import isEmpty from 'lodash-es/isEmpty.js'

type ToEndpointArgArgs = {
  context: CoreContext
  destinationPath: string
  operation: OasOperation
}

export const toEndpointArg = ({
  context,
  destinationPath,
  operation
}: ToEndpointArgArgs) => {
  const modelSettings = ModelSettings.create({
    exportPath: destinationPath
  })

  const identifier = Identifier.create({
    name: toArgsName(operation),
    modelSettings,
    type: context.typeSystemInfo.type,
    context
  })

  const body = operation.requestBody?.resolve().toSchema('application/json')

  const { properties, required } = toQueryProperties(operation, Boolean(body))

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

const toQueryProperties = (operation: OasOperation, hasBody: boolean) => {
  const parameters = operation.parameters ?? []

  const resolved = parameters.map(parameter => parameter.resolve())

  // map property schemas by name
  const properties = resolved
    .map(parameter => [parameter.name, parameter.toSchema()])
    .concat(hasBody ? [['body', 'body']] : [])

  // create list of required properties
  const required = resolved
    .filter(({ required }) => required)
    .map(({ name }) => name)
    .concat(hasBody ? ['body'] : [])

  return {
    properties: Object.fromEntries(properties),
    required
  }
}

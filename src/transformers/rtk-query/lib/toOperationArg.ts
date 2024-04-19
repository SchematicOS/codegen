import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasObject } from 'parse/elements/schema/Object.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toArgsName } from 'generate/helpers/naming.ts'

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
    sourcePath: modelSettings.getExportPath(),
    type: context.typeSystemInfo.type,
    context
  })

  const body = operation.requestBody?.resolve().toSchema('application/json')

  const parameterItems = toParametersByName(operation)

  if (!body && !parameterItems) {
    return Definition.fromValue({
      context,
      identifier,
      value: OasVoid.empty(context),
      destinationPath
    })
  }

  const parametersProperties = parameterItems?.properties || {}
  const parametersRequired = parameterItems?.required || []

  const value = OasObject.fromFields({
    fields: {
      required: parametersRequired.concat(body ? 'body' : []),
      properties: {
        ...parametersProperties,
        ...(body ? { body } : {})
      }
    },
    context
  })

  return Definition.fromValue({
    context,
    identifier,
    value,
    destinationPath
  })
}

const toParametersByName = (operation: OasOperation) => {
  const resolved = operation.parameters?.map(parameter => parameter.resolve())

  const properties = Object.fromEntries(
    resolved?.map(({ name, schema }) => [name, schema]) ?? []
  )

  return {
    properties,
    required:
      resolved?.filter(({ required }) => required).map(({ name }) => name) ?? []
  }
}

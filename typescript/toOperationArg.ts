import type { CoreContext } from '../context/CoreContext.ts'
import { Definition } from '../dsl/Definition.ts'
import { Identifier } from '../dsl/Identifier.ts'
import { ModelSettings } from '../settings/ModelSettings.ts'
import type { OasOperation } from '../oasElements/Operation.ts'
import { OasObject } from '../oasSchema/Object.ts'
import { OasVoid } from '../oasSchema/Void.ts'
import { toArgsName } from '../helpers/naming.ts'
import isEmpty from 'lodash-es/isEmpty.js'
import type { OasSchema } from '../oasSchema/types.ts'
import type { OasRef } from '../oasElements/Ref.ts'

type ToOperationArgArgs = {
  context: CoreContext
  destinationPath: string
  operation: OasOperation
}

export const toOperationArg = ({
  context,
  destinationPath,
  operation
}: ToOperationArgArgs): Definition => {
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
    description: value.description,
    destinationPath
  })
}

const toOperationArgProperties = (
  operation: OasOperation,
  body: OasSchema | OasRef<'schema'> | undefined
): {
  properties: Record<string, OasSchema | OasRef<'schema'>>
  required: string[]
} => {
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

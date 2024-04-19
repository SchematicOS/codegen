import { toArgsName } from './util.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import isEmpty from 'lodash-es/isEmpty.js'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasObject } from 'parse/elements/schema/Object.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'

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
    settings: {
      exportPath: destinationPath,
      selected: true
    }
  })

  const identifier = Identifier.create({
    name: toArgsName(operation),
    modelSettings,
    sourcePath: modelSettings.getExportPath(),
    type: context.typeSystemInfo.type,
    context
  })

  const body = toBodySchema({ operation, context })

  const parameterItems = toParametersByName({ operation, context })

  if (!body && !parameterItems) {
    return Definition.fromValue({
      context,
      identifier,
      value: OasVoid.fromFields({ context }),
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

type ToBodySchemaArgs = {
  operation: OasOperation
  context: CoreContext
}

const toBodySchema = ({ operation, context }: ToBodySchemaArgs) => {
  const { requestBody } = operation

  if (!requestBody) {
    return
  }

  const { content } = isRef(requestBody)
    ? context.resolveRef(requestBody)
    : requestBody

  return content['application/json']?.schema
}

type ToParametersByNameArgs = {
  operation: OasOperation
  context: CoreContext
}

const toParametersByName = ({ operation, context }: ToParametersByNameArgs) => {
  const { parameters } = operation

  if (!parameters || isEmpty(parameters)) {
    return
  }

  const nameRequiredSchema = parameters.map(parameter => {
    const { name, required, schema } = isRef(parameter)
      ? context.resolveRef(parameter)
      : parameter

    return { name, required, schema }
  })

  const properties = Object.fromEntries(
    nameRequiredSchema.map(({ name, schema }) => [name, schema])
  )

  return {
    properties,
    required: nameRequiredSchema
      .filter(({ required }) => required)
      .map(({ name }) => name)
  }
}

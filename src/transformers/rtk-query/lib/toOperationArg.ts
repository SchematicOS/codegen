import { toArgsName } from './util.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/settings/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import type { OasSchemaData } from '@schematicos/types'
import { oasVoidValue } from '@schematicos/types'
import isEmpty from 'lodash-es/isEmpty.js'
import type { Operation } from 'parse/elements/Operation.ts'

type ToEndpointArgArgs = {
  context: GenerateContext
  destinationPath: string
  operation: Operation
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
      value: oasVoidValue,
      destinationPath
    })
  }

  const parametersProperties = parameterItems?.properties || {}
  const parametersRequired = parameterItems?.required || []

  const value: OasSchemaData = {
    schematicType: 'schema', // TODO if there is no body and params, this should be void. Currently it is an empty object
    type: 'object',
    required: parametersRequired.concat(body ? 'body' : []),
    properties: {
      ...parametersProperties,
      ...(body ? { body } : {})
    }
  }

  return Definition.fromValue({
    context,
    identifier,
    value,
    destinationPath
  })
}

type ToBodySchemaArgs = {
  operation: Operation
  context: GenerateContext
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
  operation: Operation
  context: GenerateContext
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

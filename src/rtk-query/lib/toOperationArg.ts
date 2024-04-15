import { toArgsName } from './util.ts'
import type { GenerateContext } from 'generate/lib/GenerateContext.ts'
import { Model } from 'generate/elements/Model.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { ModelSettings } from 'generate/lib/ModelSettings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import type { OasOperation, OasSchema } from '@schematicos/types'
import { oasVoidValue } from '@schematicos/types'
import isEmpty from 'lodash-es/isEmpty.js'

type ToEndpointArgArgs = {
  context: GenerateContext
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
    source: modelSettings.getExportPath(),
    type: context.typeSystemInfo.type,
    context
  })

  const body = toBodySchema({ operation, context })

  const parameterItems = toParametersByName({ operation, context })

  if (!body && !parameterItems) {
    Model.create({
      context,
      identifier,
      value: oasVoidValue,
      destinationPath
    })
  }

  const parametersProperties = parameterItems?.properties || {}
  const parametersRequired = parameterItems?.required || []

  const value: OasSchema = {
    schematicType: 'schema', // TODO if there is no body and params, this should be void. Currently it is an empty object
    type: 'object',
    required: parametersRequired.concat(body ? 'body' : []),
    properties: {
      ...parametersProperties,
      ...(body ? { body } : {})
    }
  }

  return Model.create({
    context,
    identifier,
    value,
    destinationPath
  })
}

type ToBodySchemaArgs = {
  operation: OasOperation
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
  operation: OasOperation
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

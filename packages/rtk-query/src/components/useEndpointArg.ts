import { toArgsName } from '@/components/util.ts'
import {
  useTransformer,
  TransformerContextType,
  Identifier,
  isRef,
  useFile
} from '@schematicos/generate'
import { OasOperation, OasSchema, OasSchemaRef } from '@schematicos/types'
import invariant from 'tiny-invariant'

export const useEndpointArg = (operation: OasOperation) => {
  const ctx = useTransformer()
  const { destination } = useFile()

  const body = toBodySchema(operation, ctx)

  const identifier = Identifier.fromValue({
    name: toArgsName(operation),
    type: ctx.typeSystem.type,
    source: destination,
    modelConfig: undefined,
    ctx: ctx
  })

  const required = body ? ['body'] : []

  const value: OasSchema = {
    schematicType: 'schema', // TODO if there is no body and params, this should be void. Currently it is an empty object
    type: 'object',
    required,
    properties: {
      ...toParametersByName(operation, ctx),
      ...(body ? { body } : {})
    }
  }

  return { identifier, value }
}

const toBodySchema = (operation: OasOperation, ctx: TransformerContextType) => {
  const { requestBody } = operation

  if (!requestBody) {
    return
  }

  const { content } = isRef(requestBody)
    ? ctx.resolveRef(requestBody)
    : requestBody

  return content['application/json']?.schema
}

const toParametersByName = (
  operation: OasOperation,
  ctx: TransformerContextType
) => {
  const parameters: [string, OasSchema | OasSchemaRef][] =
    operation.parameters?.map(parameter => {
      const { name, schema } = isRef(parameter)
        ? ctx.resolveRef(parameter)
        : parameter

      invariant(schema, 'Schema is required for parameter. For now.')

      return [name, schema]
    }) ?? []

  return Object.fromEntries(parameters)
}

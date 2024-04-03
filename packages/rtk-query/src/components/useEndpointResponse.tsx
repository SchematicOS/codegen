import { toResponseName } from '@/components/util.ts'
import {
  useFile,
  isRef,
  Identifier,
  TransformerContextType,
  useTransformer
} from '@schematicos/generate'
import {
  OasOperation,
  OasResponse,
  OasResponseRef,
  OasSchema,
  OasSchemaRef,
  OasVoid
} from '@schematicos/types'

export const useEndpointResponse = (operation: OasOperation) => {
  const ctx = useTransformer()
  const { destination } = useFile()

  const identifier = Identifier.fromValue({
    name: toResponseName(operation),
    type: ctx.typeSystem.type,
    source: destination,
    modelConfig: undefined,
    ctx: ctx
  })

  const successResponse = toSuccessResponse(operation)
  const value = toResponseValue(successResponse, ctx)

  return { identifier, value }
}

const toSuccessResponse = (operation: OasOperation) => {
  const { responses } = operation

  const { default: defaultResponse, ...httpCodeResponses } = responses

  const successCode = Object.keys(httpCodeResponses)
    .map(httpCode => parseInt(httpCode))
    .sort((a, b) => a - b)
    .find(httpCode => httpCode >= 200 && httpCode < 300)

  return successCode ? httpCodeResponses[successCode] : defaultResponse
}

const toResponseValue = (
  response: OasResponse | OasResponseRef | undefined,
  ctx: TransformerContextType
): OasSchema | OasSchemaRef | OasVoid => {
  const voidResponse: OasVoid = {
    schematicType: 'schema',
    type: 'void'
  }

  if (!response) {
    return voidResponse
  }

  const resolvedResponse = isRef(response)
    ? ctx.resolveRef<OasResponseRef>(response)
    : response

  resolvedResponse.schematicType

  const schema = resolvedResponse.content?.['application/json']?.schema

  if (!schema) {
    return voidResponse
  }

  return schema
}

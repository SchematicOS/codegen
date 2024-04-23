import type { CoreContext } from 'context/CoreContext.ts'
import type { TransformerSettings } from 'generate/settings/TransformerSettings.ts'
import type { Stringable } from '@schematicos/types'
import { EMPTY } from 'generate/constants.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'
import { keyValues } from 'typescript/helpers/keyValues.ts'
import { toParamsObject } from 'typescript/helpers/toParamsObject.ts'
import { toOperationResponse } from 'typescript/helpers/toOperationResponse.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import { toInferredType } from 'typescript/toInferredType.ts'
import { toEndpointName, toEndpointType } from 'generate/helpers/naming.ts'
import { toOperationArg } from 'typescript/helpers/toOperationArg.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { BaseNode } from '@schematicos/types'

// TODO: Idea for condensed transformer creation api

type RenderChildrenFn = (separator: string) => string

type Render<U> = U & { renderChildren: RenderChildrenFn }

export type CreateTransformerArgs<T, U = T> = {
  create?: (args: T) => U
  register?: (props: U) => void
  render: (props: Render<U>) => string
}

export type CreateTransformerFn<T, U = T> = (
  args: CreateTransformerArgs<T, U>
) => { create: (args: T) => U & BaseNode }

export const createTransformer = <T, U = T>(
  // deno-lint-ignore no-unused-vars
  { create, register, render }: CreateTransformerArgs<T, U>
) => {
  console.log('Coming soon!')

  // deno-lint-ignore no-unused-vars
  return { create: (args: T) => null as unknown as U & BaseNode }
}

type RtkQueryContainerProps = {
  context: CoreContext
  operations: Stringable[]
  transformerSettings: TransformerSettings
}

export const RtkQueryContainer = createTransformer<RtkQueryContainerProps>({
  register: ({ transformerSettings }) => ({
    imports: {
      '@reduxjs/toolkit/query/react': ['createApi', 'fetchBaseQuery']
    },
    destinationPath: transformerSettings.getExportPath({ appendFileName: true })
  }),
  render: ({ renderChildren }) => {
    return `export const injectedRtkApi = createApi({
      baseQuery: fetchBaseQuery({ baseUrl: '/' }),
      endpoints: (build) => ({${renderChildren(',\n')}}),
      overrideExisting: false
    })`
  }
})

type QueryCallProps = {
  queryArg: string
  operation: OasOperation
  context: CoreContext
}

export const QueryCall = createTransformer({
  create: ({ operation, context, queryArg }: QueryCallProps) => ({
    operation,
    context,
    queryArg,
    properties: toArgProperties({ operation, queryArg })
  }),

  render: ({ queryArg, properties, operation }) => {
    const { params, headers, body } = properties
    const { path } = operation
    const isEmpty = !params?.length && !headers?.length && !body

    return `(${isEmpty ? '' : queryArg}) => (${keyValues({
      path: toPathTemplate(path, queryArg),
      method: operation.method.toUpperCase(),
      params: params?.length ? toParamsObject(params, queryArg) : EMPTY,
      headers: headers?.length ? toParamsObject(headers, queryArg) : EMPTY,
      body: operation.requestBody ? `${queryArg}.body` : EMPTY
    })})`
  }
})

type ToPropertiesArgs = {
  operation: OasOperation
  queryArg: string
}

const toArgProperties = ({ operation }: ToPropertiesArgs) => {
  const parameters = operation.parameters?.map(parameter => parameter.resolve())

  const params = parameters?.filter(
    ({ location }) => location === 'path' || location === 'query'
  )

  const headers = parameters?.filter(
    ({ location, name }) => location === 'header' && name !== 'Authorization'
  )

  return { params, headers, body: operation.requestBody }
}

export type EndpointArgs = {
  context: CoreContext
  operationSettings: OperationSettings
  operation: OasOperation
}

export const RtkEndpoint = createTransformer({
  create: ({ operation, operationSettings, context }: EndpointArgs) => {
    const destinationPath = operationSettings.getExportPath()

    const endpointResponse = toOperationResponse({
      context,
      destinationPath,
      operation
    })

    const endpointArg = toOperationArg({
      context,
      destinationPath,
      operation
    })

    const queryCall = QueryCall.create({
      context,
      operation,
      queryArg: 'queryArg'
    })

    return {
      context,
      operation,
      operationSettings,
      endpointArgType: toInferredType(endpointArg.identifier),
      endpointResponseType: toInferredType(endpointResponse.identifier),
      queryCall
    }
  },
  register: ({ operationSettings }) => ({
    definitions: [operationSettings, operationSettings.getExportPath()],
    destinationPath: operationSettings.getExportPath()
  }),
  render: ({ operation, endpointResponseType, endpointArgType, queryCall }) => {
    return `${toEndpointName(operation)}: build.${toEndpointType(operation)}<${
      endpointResponseType.identifier
    },${endpointArgType.identifier}>
    ({query: ${queryCall}})`
  }
})

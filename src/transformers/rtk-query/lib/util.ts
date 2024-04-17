import type { OasOperationData } from '@schematicos/types'
import camelCase from 'lodash-es/camelCase.js'

export const toEndpointType = (operation: OasOperationData) => {
  return operation.method === 'get' ? 'query' : 'mutation'
}

export const toEndpointName = (operation: OasOperationData) => {
  const { path, method } = operation

  return camelCase(`${method}Api${path}`)
}

export const toResponseName = (operation: OasOperationData) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Response`
}

export const toArgsName = (operation: OasOperationData) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Args`
}

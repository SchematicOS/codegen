import type { OasOperation } from '@schematicos/types'
import camelCase from 'lodash-es/camelCase.js'

export const toEndpointType = (operation: OasOperation) => {
  return operation.method === 'get' ? 'query' : 'mutation'
}

export const toEndpointName = (operation: OasOperation) => {
  const { path, method } = operation

  return camelCase(`${method}Api${path}`)
}

export const toResponseName = (operation: OasOperation) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Response`
}

export const toArgsName = (operation: OasOperation) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Args`
}

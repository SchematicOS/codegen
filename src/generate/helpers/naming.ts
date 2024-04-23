import camelCase from 'lodash-es/camelCase'
import type { OasOperation } from 'parse/elements/Operation.ts'

export const toEndpointType = (operation: OasOperation) => {
  return operation.method === 'get' ? 'query' : 'mutation'
}

/** generates endpoint name in the `camelCase{method}Api{path}` format */
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

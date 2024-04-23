import camelCase from 'lodash-es/camelCase.js'
import type { OasOperation } from 'parse/elements/Operation.ts'

export const toEndpointType = (
  operation: OasOperation
): 'query' | 'mutation' => {
  return operation.method === 'get' ? 'query' : 'mutation'
}

/** generates endpoint name in the `camelCase{method}Api{path}` format */
export const toEndpointName = (operation: OasOperation): string => {
  const { path, method } = operation

  return camelCase(`${method}Api${path}`)
}

export const toResponseName = (operation: OasOperation): string => {
  const operationName = toEndpointName(operation)

  return `${operationName}Response`
}

export const toArgsName = (operation: OasOperation): string => {
  const operationName = toEndpointName(operation)

  return `${operationName}Args`
}

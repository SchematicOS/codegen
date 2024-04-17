import camelCase from 'lodash-es/camelCase.js'
import type { Operation } from 'parse/elements/Operation.ts'

export const toEndpointType = (operation: Operation) => {
  return operation.method === 'get' ? 'query' : 'mutation'
}

export const toEndpointName = (operation: Operation) => {
  const { path, method } = operation

  return camelCase(`${method}Api${path}`)
}

export const toResponseName = (operation: Operation) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Response`
}

export const toArgsName = (operation: Operation) => {
  const operationName = toEndpointName(operation)

  return `${operationName}Args`
}

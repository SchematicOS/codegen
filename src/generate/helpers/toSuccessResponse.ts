import type { OasResponseRefData } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasResponse } from 'parse/elements/Response.ts'

export const toSuccessResponse = (
  operation: OasOperation
): OasResponse | OasResponseRefData => {
  const { responses } = operation

  const { default: defaultResponse, ...httpCodeResponses } = responses

  const successCode = Object.keys(httpCodeResponses)
    .map(httpCode => parseInt(httpCode))
    .sort((a, b) => a - b)
    .find(httpCode => httpCode >= 200 && httpCode < 300)

  return successCode ? httpCodeResponses[successCode] : defaultResponse
}

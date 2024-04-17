import type { OasResponseRefData } from '@schematicos/types'
import type { Operation } from 'parse/elements/Operation.ts'
import type { Response } from 'parse/elements/Response.ts'

export const toSuccessResponse = (
  operation: Operation
): Response | OasResponseRefData => {
  const { responses } = operation

  const { default: defaultResponse, ...httpCodeResponses } = responses

  const successCode = Object.keys(httpCodeResponses)
    .map(httpCode => parseInt(httpCode))
    .sort((a, b) => a - b)
    .find(httpCode => httpCode >= 200 && httpCode < 300)

  return successCode ? httpCodeResponses[successCode] : defaultResponse
}

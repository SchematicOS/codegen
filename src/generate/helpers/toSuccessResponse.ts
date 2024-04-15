import type { OasOperation, OasResponseRef, OasResponse } from '@schematicos/types'

export const toSuccessResponse = (operation: OasOperation):OasResponse | OasResponseRef => {
  const { responses } = operation

  const { default: defaultResponse, ...httpCodeResponses } = responses

  const successCode = Object.keys(httpCodeResponses)
    .map(httpCode => parseInt(httpCode))
    .sort((a, b) => a - b)
    .find(httpCode => httpCode >= 200 && httpCode < 300)

  return successCode ? httpCodeResponses[successCode] : defaultResponse
}

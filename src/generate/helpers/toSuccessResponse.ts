import type {
  OasOperationData,
  OasResponseRefData,
  OasResponseData
} from '@schematicos/types'

export const toSuccessResponse = (
  operation: OasOperationData
): OasResponseData | OasResponseRefData => {
  const { responses } = operation

  const { default: defaultResponse, ...httpCodeResponses } = responses

  const successCode = Object.keys(httpCodeResponses)
    .map(httpCode => parseInt(httpCode))
    .sort((a, b) => a - b)
    .find(httpCode => httpCode >= 200 && httpCode < 300)

  return successCode ? httpCodeResponses[successCode] : defaultResponse
}

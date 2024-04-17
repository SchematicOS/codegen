import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type {
  OasResponseRefData,
  Method,
  OasParameterRefData,
  OasRequestBodyRefData
} from '@schematicos/types'
import type { PathItem } from 'parse/elements/PathItem.ts'
import type { Parameter } from 'parse/elements/Parameter.ts'
import type { RequestBody } from 'parse/elements/RequestBody.ts'
import type { Response } from 'parse/elements/Response.ts'

export type OperationFields = {
  path: string
  method: Method
  pathItem: PathItem
  operationId: string | undefined
  summary: string | undefined
  tags: string[] | undefined
  description: string | undefined
  parameters: (Parameter | OasParameterRefData)[] | undefined
  requestBody: RequestBody | OasRequestBodyRefData | undefined
  responses: Record<string, Response | OasResponseRefData>
  deprecated: boolean | undefined
}

type ToOperationV3Args = {
  fields: OperationFields
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Operation extends OasBase {
  schematicType: 'operation' = 'operation'
  fields: OperationFields

  private constructor({ fields, trail, skipped, context }: ToOperationV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToOperationV3Args) {
    return new Operation({ fields, trail, context, skipped })
  }

  toSuccessResponse(): Response | OasResponseRefData {
    const { default: defaultResponse, ...httpCodeResponses } = this.responses

    const successCode = Object.keys(httpCodeResponses)
      .map(httpCode => parseInt(httpCode))
      .sort((a, b) => a - b)
      .find(httpCode => httpCode >= 200 && httpCode < 300)

    return successCode ? httpCodeResponses[successCode] : defaultResponse
  }

  get path() {
    return this.fields.path
  }

  get method() {
    return this.fields.method
  }

  get pathItem() {
    return this.fields.pathItem
  }

  get operationId() {
    return this.fields.operationId
  }

  get summary() {
    return this.fields.summary
  }

  get tags() {
    return this.fields.tags
  }

  get description() {
    return this.fields.description
  }

  get parameters() {
    return this.fields.parameters
  }

  get requestBody() {
    return this.fields.requestBody
  }

  get responses() {
    return this.fields.responses
  }

  get deprecated() {
    return this.fields.deprecated
  }
}

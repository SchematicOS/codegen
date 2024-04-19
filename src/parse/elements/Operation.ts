import { OasBase } from 'parse/elements/OasBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { Method } from '@schematicos/types'
import type { OasPathItem } from 'parse/elements/PathItem.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import type { OasRequestBody } from 'parse/elements/RequestBody.ts'
import type { OasResponse } from 'parse/elements/Response.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

export type OperationFields = {
  path: string
  method: Method
  pathItem: OasPathItem
  operationId: string | undefined
  summary: string | undefined
  tags: string[] | undefined
  description: string | undefined
  parameters: (OasParameter | OasRef<'parameter'>)[] | undefined
  requestBody: OasRequestBody | OasRef<'requestBody'> | undefined
  responses: Record<string, OasResponse | OasRef<'response'>>
  deprecated: boolean | undefined
}

type ToOperationV3Args = {
  fields: OperationFields
  trail: Trail
  context: CoreContext
  skipped: Record<string, unknown>
}

export class OasOperation extends OasBase {
  schematicType: 'operation' = 'operation'
  fields: OperationFields

  private constructor({ fields, trail, skipped, context }: ToOperationV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToOperationV3Args) {
    return new OasOperation({ fields, trail, context, skipped })
  }

  toSuccessResponse(): OasResponse | OasRef<'response'> {
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

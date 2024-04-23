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

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToOperationV3Args): OasOperation {
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

  get path(): string {
    return this.fields.path
  }

  get method(): Method {
    return this.fields.method
  }

  get pathItem(): OasPathItem {
    return this.fields.pathItem
  }

  get operationId(): string | undefined {
    return this.fields.operationId
  }

  get summary(): string | undefined {
    return this.fields.summary
  }

  get tags(): string[] | undefined {
    return this.fields.tags
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get parameters(): (OasParameter | OasRef<'parameter'>)[] | undefined {
    return this.fields.parameters
  }

  get requestBody(): OasRequestBody | OasRef<'requestBody'> | undefined {
    return this.fields.requestBody
  }

  get responses(): Record<string, OasResponse | OasRef<'response'>> {
    return this.fields.responses
  }

  get deprecated(): boolean | undefined {
    return this.fields.deprecated
  }
}

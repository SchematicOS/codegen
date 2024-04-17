import { OasBase } from 'parse/elements/OasBase.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type {
  OasOperationData,
  OasResponseRefData,
  OasResponseData
} from '@schematicos/types'
type ToOperationV3Args = {
  fields: Omit<OasOperationData, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Operation extends OasBase {
  schematicType: 'operation' = 'operation'
  fields: Omit<OasOperationData, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToOperationV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToOperationV3Args) {
    return new Operation({ fields, trail, context, skipped })
  }

  toSuccessResponse(): OasResponseData | OasResponseRefData {
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

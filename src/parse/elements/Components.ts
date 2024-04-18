import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type {
  OasExampleRefData,
  OasHeaderRefData,
  OasParameterRefData,
  OasRequestBodyRefData,
  OasResponseRefData,
  OasSchemaData,
  OasSchemaRefData
} from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { Response } from 'parse/elements/Response.ts'
import type { Parameter } from 'parse/elements/Parameter.ts'
import type { Example } from 'parse/elements/Example.ts'
import type { RequestBody } from 'parse/elements/RequestBody.ts'
import type { Header } from 'parse/elements/Header.ts'

export type ComponentsFields = {
  models?: Record<string, OasSchemaData | OasSchemaRefData>
  responses?: Record<string, Response | OasResponseRefData>
  parameters?: Record<string, Parameter | OasParameterRefData>
  examples?: Record<string, Example | OasExampleRefData>
  requestBodies?: Record<string, RequestBody | OasRequestBodyRefData>
  headers?: Record<string, Header | OasHeaderRefData>
}

type ToComponentsV3Args = {
  fields: ComponentsFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Components extends OasBase {
  schematicType: 'components' = 'components'
  fields: ComponentsFields

  private constructor({ fields, trail, skipped, context }: ToComponentsV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToComponentsV3Args) {
    return new Components({ fields, trail, context, skipped })
  }

  get models() {
    return this.fields.models
  }

  get responses() {
    return this.fields.responses
  }

  get parameters() {
    return this.fields.parameters
  }

  get examples() {
    return this.fields.examples
  }

  get requestBodies() {
    return this.fields.requestBodies
  }

  get headers() {
    return this.fields.headers
  }
}

import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasComponents } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'

type ToComponentsV3Args = {
  fields: Omit<OasComponents, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Components extends OasBase implements OasComponents {
  schematicType: 'components' = 'components'
  fields: Omit<OasComponents, 'schematicType'>

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

  get pathItems() {
    return this.fields.pathItems
  }
}

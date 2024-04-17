import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasComponents } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'

type ToComponentsV3Args = {
  properties: Omit<OasComponents, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Components implements OasComponents {
  schematicType: 'components' = 'components'
  properties: Omit<OasComponents, 'schematicType'>
  trail: Trail
  context: ParseContext

  private constructor({
    properties,
    trail,
    context,
    skipped
  }: ToComponentsV3Args) {
    this.properties = properties
    this.trail = trail
    this.context = context

    context.notImplemented({ section: 'OPENAPI_V3_COMPONENTS', skipped })
  }

  static create({ properties, trail, context, skipped }: ToComponentsV3Args) {
    return new Components({ properties, trail, context, skipped })
  }

  get models() {
    return this.properties.models
  }

  get responses() {
    return this.properties.responses
  }

  get parameters() {
    return this.properties.parameters
  }

  get examples() {
    return this.properties.examples
  }

  get requestBodies() {
    return this.properties.requestBodies
  }

  get headers() {
    return this.properties.headers
  }

  get pathItems() {
    return this.properties.pathItems
  }
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasObject } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToObjectV3Args = {
  fields: Omit<OasObject, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class ObjectOas extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'object' = 'object'
  fields: Omit<OasObject, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToObjectV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToObjectV3Args) {
    return new Object({ fields, trail, context, skipped })
  }

  get properties() {
    return this.fields.properties
  }

  get required() {
    return this.fields.required
  }

  get additionalProperties() {
    return this.fields.additionalProperties
  }
}

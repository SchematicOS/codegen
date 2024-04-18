import { OasBase } from 'parse/elements/OasBase.ts'
import { Trail } from 'core/lib/Trail.ts'
import { ParseContext } from 'core/lib/ParseContext.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

export type OasObjectFields = {
  title?: string
  description?: string
  properties?: Record<string, OasSchema | OasRef<'schema'>>
  required: string[] | undefined
  additionalProperties?: boolean | OasSchema | OasRef<'schema'>
}

type ToObjectV3Args = {
  fields: OasObjectFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasObject extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'object' = 'object'
  fields: OasObjectFields

  private constructor({ fields, trail, skipped, context }: ToObjectV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToObjectV3Args) {
    return new OasObject({ fields, trail, context, skipped })
  }

  static fromFields(fields: OasObjectFields) {
    return new OasObject({
      fields,
      trail: Trail.create(),
      context: ParseContext.create(),
      skipped: {}
    })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
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

import { OasBase } from 'parse/elements/OasBase.ts'
import { Trail } from 'core/lib/Trail.ts'
import { CoreContext } from 'core/lib/CoreContext.ts'

export type UnknownFields = {
  title?: string
  description?: string
}

type ToUnknownV3Args = {
  fields: UnknownFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasUnknown extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'unknown' = 'unknown'
  fields: UnknownFields

  private constructor({ fields, trail, skipped, context }: ToUnknownV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToUnknownV3Args) {
    return new OasUnknown({ fields, trail, context, skipped })
  }

  static fromFields(fields: UnknownFields = {}) {
    return new OasUnknown({
      fields,
      trail: Trail.create(),
      context: CoreContext.create(),
      skipped: {}
    })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

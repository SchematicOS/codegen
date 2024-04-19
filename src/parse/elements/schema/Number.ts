import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

export type NumberFields = {
  title?: string
  description?: string
}

type ToNumberV3Args = {
  fields: NumberFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasNumber extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'number' = 'number'
  fields: NumberFields

  private constructor({ fields, trail, skipped, context }: ToNumberV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToNumberV3Args) {
    return new OasNumber({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }

  isRef(): this is OasRef<'schema'> {
    return false
  }

  resolve() {
    return this
  }
}

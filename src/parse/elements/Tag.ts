import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { ParseContext } from 'core/lib/ParseContext.ts'

export type TagFields = {
  name: string
  description: string | undefined
}

type ToTagV3Args = {
  fields: TagFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasTag extends OasBase {
  schematicType: 'tag' = 'tag'
  fields: TagFields

  private constructor({ fields, trail, skipped, context }: ToTagV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToTagV3Args) {
    return new OasTag({ fields, trail, context, skipped })
  }

  get name() {
    return this.fields.name
  }

  get description() {
    return this.fields.description
  }
}

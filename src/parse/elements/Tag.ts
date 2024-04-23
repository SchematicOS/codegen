import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'

export type TagFields = {
  name: string
  description: string | undefined
}

type ToTagV3Args = {
  fields: TagFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasTag extends OasBase {
  schematicType: 'tag' = 'tag'
  fields: TagFields

  private constructor({ fields, trail, skipped, context }: ToTagV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToTagV3Args): OasTag {
    return new OasTag({ fields, trail, context, skipped })
  }

  get name(): string {
    return this.fields.name
  }

  get description(): string | undefined {
    return this.fields.description
  }
}

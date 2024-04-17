import type { OasTag } from '@schematicos/types'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToTagV3Args = {
  fields: Omit<OasTag, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Tag extends OasBase {
  schematicType: 'tag' = 'tag'
  fields: Omit<OasTag, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToTagV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToTagV3Args) {
    return new Tag({ fields, trail, context, skipped })
  }

  get name() {
    return this.fields.name
  }

  get description() {
    return this.fields.description
  }
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

export type ArrayFields = {
  items: OasSchema | OasRef<'schema'>
  title?: string
  description?: string
}

type ToArrayV3Args = {
  fields: ArrayFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasArray extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'array' = 'array'
  fields: ArrayFields

  private constructor({ fields, trail, skipped, context }: ToArrayV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToArrayV3Args) {
    return new OasArray({ fields, trail, context, skipped })
  }

  get items() {
    return this.fields.items
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }
}

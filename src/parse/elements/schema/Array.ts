import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasArray } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToArrayV3Args = {
  fields: Omit<OasArray, 'schematicType' | 'type'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class ArrayOas extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'array' = 'array'
  fields: Omit<OasArray, 'schematicType' | 'type'>

  private constructor({ fields, trail, skipped, context }: ToArrayV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToArrayV3Args) {
    return new ArrayOas({ fields, trail, context, skipped })
  }

  get items() {
    return this.fields.items
  }
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasPathItem } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type ToPathItemV3Args = {
  fields: Omit<OasPathItem, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class PathItem extends OasBase {
  schematicType: 'pathItem' = 'pathItem'
  fields: Omit<OasPathItem, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToPathItemV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToPathItemV3Args) {
    return new PathItem({ fields, trail, context, skipped })
  }

  get $ref() {
    return this.fields.$ref
  }

  get summary() {
    return this.fields.summary
  }

  get description() {
    return this.fields.description
  }

  get parameters() {
    return this.fields.parameters
  }
}

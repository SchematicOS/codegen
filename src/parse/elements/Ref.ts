import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasRefData } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToRefV3Args = {
  fields: Omit<OasRefData, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Ref extends OasBase {
  schematicType: 'ref' = 'ref'
  fields: Omit<OasRefData, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToRefV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToRefV3Args) {
    return new Ref({ fields, trail, context, skipped })
  }

  get $ref() {
    return this.fields.$ref
  }

  get refType() {
    return this.fields.refType
  }

  get summary() {
    return this.fields.summary
  }

  get description() {
    return this.fields.description
  }
}

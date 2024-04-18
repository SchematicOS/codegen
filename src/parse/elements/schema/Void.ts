import { OasBase } from 'parse/elements/OasBase.ts'
import { Trail } from 'parse/lib/Trail.ts'
import { ParseContext } from 'parse/lib/ParseContext.ts'

export type VoidFields = {
  title?: string
  description?: string
}

type ToVoidV3Args = {
  fields: VoidFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasVoid extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'void' = 'void'
  fields: VoidFields

  private constructor({ fields, trail, skipped, context }: ToVoidV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToVoidV3Args) {
    return new OasVoid({ fields, trail, context, skipped })
  }

  static fromFields(fields: VoidFields = {}) {
    return new OasVoid({
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
}

import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

export type PathItemFields = {
  summary: string | undefined
  description: string | undefined
  parameters: (OasParameter | OasRef<'parameter'>)[] | undefined
}

type ToPathItemV3Args = {
  fields: PathItemFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasPathItem extends OasBase {
  schematicType: 'pathItem' = 'pathItem'
  fields: PathItemFields

  private constructor({ fields, trail, skipped, context }: ToPathItemV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToPathItemV3Args) {
    return new OasPathItem({ fields, trail, context, skipped })
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

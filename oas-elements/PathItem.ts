import { OasBase } from './OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasParameter } from './Parameter.ts'
import type { OasRef } from './Ref.ts'

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

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToPathItemV3Args): OasPathItem {
    return new OasPathItem({ fields, trail, context, skipped })
  }

  get summary(): string | undefined {
    return this.fields.summary
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get parameters(): (OasParameter | OasRef<'parameter'>)[] | undefined {
    return this.fields.parameters
  }
}

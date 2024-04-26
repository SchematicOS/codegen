import { OasBase } from '../oasElements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oasElements/Ref.ts'

export type BooleanFields = {
  title?: string
  description?: string
}

type ToBooleanV3Args = {
  fields: BooleanFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasBoolean extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'boolean' = 'boolean'
  fields: BooleanFields

  private constructor({ fields, trail, skipped, context }: ToBooleanV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToBooleanV3Args): OasBoolean {
    return new OasBoolean({ fields, trail, context, skipped })
  }

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  isRef(): this is OasRef<'schema'> {
    return false
  }

  resolve(): OasBoolean {
    return this
  }
}

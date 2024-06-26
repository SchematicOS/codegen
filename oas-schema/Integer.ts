import { OasBase } from '../oas-elements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

export type IntegerFields = {
  title?: string
  description?: string
}

type ToIntegerV3Args = {
  fields: IntegerFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasInteger extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'integer' = 'integer'
  fields: IntegerFields

  private constructor({ fields, trail, skipped, context }: ToIntegerV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToIntegerV3Args): OasInteger {
    return new OasInteger({ fields, trail, context, skipped })
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

  resolve(): OasInteger {
    return this
  }
}

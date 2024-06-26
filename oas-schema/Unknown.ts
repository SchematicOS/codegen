import { OasBase } from '../oas-elements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

export type UnknownFields = {
  title?: string
  description?: string
}

type ToUnknownV3Args = {
  fields: UnknownFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasUnknown extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'unknown' = 'unknown'
  fields: UnknownFields

  private constructor({ fields, trail, skipped, context }: ToUnknownV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToUnknownV3Args): OasUnknown {
    return new OasUnknown({ fields, trail, context, skipped })
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

  resolve(): OasUnknown {
    return this
  }
}

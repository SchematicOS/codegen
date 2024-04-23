import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'context/Trail.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

export type StringFields = {
  title?: string
  description?: string
  // format?: string
  // pattern?: string
  // enums?: string[]
}

type ToStringV3Args = {
  fields: StringFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasString extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'string' = 'string'
  fields: StringFields

  private constructor({ fields, trail, skipped, context }: ToStringV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToStringV3Args): OasString {
    return new OasString({ fields, trail, context, skipped })
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

  resolve(): OasString {
    return this
  }

  // get format() {
  //   return this.fields.format
  // }

  // get pattern() {
  //   return this.fields.pattern
  // }

  // get enums() {
  //   return this.fields.enums
  // }
}

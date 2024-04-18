import { OasBase } from 'parse/elements/OasBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Trail } from 'core/lib/Trail.ts'

export type ExampleFields = {
  summary: string | undefined
  description: string | undefined
  value: unknown
}

type ToExampleV3Args = {
  fields: ExampleFields
  trail: Trail
  context: CoreContext
  skipped: Record<string, unknown>
}

export class OasExample extends OasBase {
  schematicType: 'example' = 'example'
  fields: ExampleFields

  private constructor({ fields, trail, skipped, context }: ToExampleV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToExampleV3Args) {
    return new OasExample({ fields, trail, context, skipped })
  }

  get summary() {
    return this.fields.summary
  }

  get description() {
    return this.fields.description
  }

  get value() {
    return this.fields.value
  }
}

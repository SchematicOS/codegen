import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasExample } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToExampleV3Args = {
  fields: Omit<OasExample, 'schematicType'>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Example extends OasBase {
  schematicType: 'example' = 'example'
  fields: Omit<OasExample, 'schematicType'>

  private constructor({ fields, trail, skipped, context }: ToExampleV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToExampleV3Args) {
    return new Example({ fields, trail, context, skipped })
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

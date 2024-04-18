import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasRefData } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

export type RefFields<T extends OasRefData['refType']> = {
  refType: T
  $ref: string
  summary?: string
  description?: string
}

type ToRefV3Args<T extends OasRefData['refType']> = {
  fields: RefFields<T>
  trail: Trail
  context: ParseContext
  skipped: Record<string, unknown>
}

export class Ref<T extends OasRefData['refType']> extends OasBase {
  schematicType: 'ref' = 'ref'
  fields: RefFields<T>

  private constructor({ fields, trail, skipped, context }: ToRefV3Args<T>) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create<T extends OasRefData['refType']>({
    fields,
    trail,
    context,
    skipped
  }: ToRefV3Args<T>) {
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

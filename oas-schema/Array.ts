import { OasBase } from '../oas-elements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasSchema } from './types.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

export type ArrayFields = {
  items: OasSchema | OasRef<'schema'>
  title?: string
  description?: string
}

type ToArrayV3Args = {
  fields: ArrayFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasArray extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'array' = 'array'
  fields: ArrayFields

  private constructor({ fields, trail, skipped, context }: ToArrayV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToArrayV3Args): OasArray {
    return new OasArray({ fields, trail, context, skipped })
  }

  get items(): OasSchema | OasRef<'schema'> {
    return this.fields.items
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

  resolve(): OasArray {
    return this
  }
}

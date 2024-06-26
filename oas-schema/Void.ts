import { OasBase } from '../oas-elements/OasBase.ts'
import { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

export type VoidFields = {
  title?: string
  description?: string
}

type FromFieldsArgs = {
  fields?: VoidFields
  context: CoreContext
}

type ToVoidV3Args = {
  fields: VoidFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasVoid extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'void' = 'void'
  fields: VoidFields

  private constructor({ fields, trail, skipped, context }: ToVoidV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToVoidV3Args): OasVoid {
    return new OasVoid({ fields, trail, context, skipped })
  }

  static empty(context: CoreContext): OasVoid {
    return new OasVoid({
      fields: {},
      trail: Trail.create(),
      context,
      skipped: {}
    })
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

  resolve(): OasVoid {
    return this
  }
}

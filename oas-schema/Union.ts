import { OasBase } from '../oas-elements/OasBase.ts'
import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasDiscriminator } from '../oas-elements/Discriminator.ts'
import type { OasSchema } from './types.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

export type UnionFields = {
  title?: string
  description?: string
  discriminator?: OasDiscriminator
  members: (OasSchema | OasRef<'schema'>)[]
}

type ToUnionV3Args = {
  fields: UnionFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasUnion extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'union' = 'union'
  fields: UnionFields

  private constructor({ fields, trail, skipped, context }: ToUnionV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToUnionV3Args): OasUnion {
    return new OasUnion({ fields, trail, context, skipped })
  }

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get discriminator(): OasDiscriminator | undefined {
    return this.fields.discriminator
  }

  get members(): (OasSchema | OasRef<'schema'>)[] {
    return this.fields.members
  }

  isRef(): this is OasRef<'schema'> {
    return false
  }

  resolve(): OasUnion {
    return this
  }
}

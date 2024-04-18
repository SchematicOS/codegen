import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasDiscriminator } from 'parse/elements/Discriminator.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

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
  context: ParseContext
}

export class OasUnion extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'union' = 'union'
  fields: UnionFields

  private constructor({ fields, trail, skipped, context }: ToUnionV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToUnionV3Args) {
    return new OasUnion({ fields, trail, context, skipped })
  }

  get title() {
    return this.fields.title
  }

  get description() {
    return this.fields.description
  }

  get discriminator() {
    return this.fields.discriminator
  }

  get members() {
    return this.fields.members
  }
}

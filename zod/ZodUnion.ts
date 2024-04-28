import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasDiscriminatorData } from '../oas-types/discriminator.ts'
import type { Stringable } from '../dsl/Stringable.ts'
import type { OasSchema } from '../oas-schema/types.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

type ZodUnionArgs = {
  context: CoreContext
  destinationPath: string
  members: (OasSchema | OasRef<'schema'>)[]
  discriminator?: OasDiscriminatorData
}

export class ZodUnion extends SchematicBase implements Stringable {
  members: (OasSchema | OasRef<'schema'>)[]
  discriminator?: OasDiscriminatorData

  private constructor({
    context,
    destinationPath,
    members,
    discriminator
  }: ZodUnionArgs) {
    super({ context })

    this.members = members
    this.discriminator = discriminator

    this.children = toChildren({ context, destinationPath, members })
  }

  static create(args: ZodUnionArgs) {
    return new ZodUnion(args)
  }

  toString() {
    const members = this.renderChildren(',\n')

    return this.discriminator
      ? `z.discriminatedUnion('status', ${members})`
      : `z.union([${members}])`
  }
}

type ToChildrenArgs = {
  context: CoreContext
  destinationPath: string
  members: (OasSchema | OasRef<'schema'>)[]
}

const toChildren = ({ context, destinationPath, members }: ToChildrenArgs) => {
  return members
    .filter((member): member is OasSchema => !member.isRef())
    .map(member => {
      return context.toTypeSystem({
        destinationPath,
        value: member,
        required: true
      })
    })
}

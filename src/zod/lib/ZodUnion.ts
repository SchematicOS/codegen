import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type {
  OasDiscriminator,
  OasSchemaRef,
  OasSchema,
  Stringable
} from '@schematicos/types'
import { isRef } from 'generate/helpers/ref.ts'

type ZodUnionArgs = {
  context: GenerateContext
  destinationPath: string
  members: (OasSchema | OasSchemaRef)[]
  discriminator?: OasDiscriminator
}

export class ZodUnion extends SchematicBase implements Stringable {
  members: (OasSchema | OasSchemaRef)[]
  discriminator?: OasDiscriminator

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
  context: GenerateContext
  destinationPath: string
  members: (OasSchema | OasSchemaRef)[]
}

const toChildren = ({ context, destinationPath, members }: ToChildrenArgs) => {
  return members
    .filter((member): member is OasSchema => !isRef(member))
    .map(member => {
      return context.toTypeSystem({
        destinationPath,
        value: member,
        required: true
      })
    })
}

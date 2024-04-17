import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type {
  OasDiscriminatorData,
  OasSchemaRefData,
  OasSchemaData,
  Stringable
} from '@schematicos/types'
import { isRef } from 'generate/helpers/ref.ts'

type ZodUnionArgs = {
  context: GenerateContext
  destinationPath: string
  members: (OasSchemaData | OasSchemaRefData)[]
  discriminator?: OasDiscriminatorData
}

export class ZodUnion extends SchematicBase implements Stringable {
  members: (OasSchemaData | OasSchemaRefData)[]
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
  context: GenerateContext
  destinationPath: string
  members: (OasSchemaData | OasSchemaRefData)[]
}

const toChildren = ({ context, destinationPath, members }: ToChildrenArgs) => {
  return members
    .filter((member): member is OasSchemaData => !isRef(member))
    .map(member => {
      return context.toTypeSystem({
        destinationPath,
        value: member,
        required: true
      })
    })
}

import { ZodString } from './ZodString.ts'
import { ZodArray } from './ZodArray.ts'
import { match } from 'ts-pattern'
import type { Stringable } from '../schematicTypes/stringable.ts'
import { ZodRef } from './ZodRef.ts'
import { ZodObject } from './ZodObject.ts'
import { ZodUnion } from './ZodUnion.ts'
import { ZodIntersection } from './ZodIntersection.ts'
import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { TypeSystemArgs } from '../generate/types.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oasElements/Ref.ts'
import type { OasSchema } from '../oasSchema/types.ts'
import type { OasVoid } from '../oasSchema/Void.ts'
import { withDescription } from '../typescript/withDescription.ts'
import { ZodOptional } from './ZodOptional.ts'

export class Zod extends SchematicBase implements Stringable {
  destinationPath: string
  value: OasSchema | OasRef<'schema'> | OasVoid
  required: boolean | undefined

  private constructor({
    context,
    destinationPath,
    value,
    required
  }: TypeSystemArgs) {
    super({ context })

    this.destinationPath = destinationPath
    this.value = value
    this.required = required

    const children = toChildren({ value, required, destinationPath, context })

    this.children.push(children)

    this.register({
      imports: { zod: 'z' },
      destinationPath: this.destinationPath
    })
  }

  static create(args: TypeSystemArgs): Stringable {
    return new Zod(args)
  }

  toString() {
    return this.renderChildren()
  }
}

type ToChildrenArgs = {
  context: CoreContext
  destinationPath: string
  value: OasSchema | OasRef<'schema'> | OasVoid
  required: boolean | undefined
}

const toChildren = ({
  context,
  destinationPath,
  value,
  required
}: ToChildrenArgs): Stringable => {
  const children = match(value)
    .with({ schematicType: 'ref' }, ref => {
      return ZodRef.create({ context, destinationPath, ref })
    })
    .with({ type: 'array' }, ({ items }) => {
      return ZodArray.create({
        context,
        destinationPath,
        items
      })
    })
    .with({ type: 'object' }, matched => {
      return ZodObject.create({ context, destinationPath, value: matched })
    })
    .with({ type: 'union' }, ({ members, discriminator }) => {
      return ZodUnion.create({
        context,
        destinationPath,
        members,
        discriminator
      })
    })
    .with({ type: 'intersection' }, ({ members }) => {
      return ZodIntersection.create({ context, destinationPath, members })
    })
    .with({ type: 'number' }, () => `z.number()`)
    .with({ type: 'integer' }, () => `z.number().int()`)
    .with({ type: 'boolean' }, () => `z.boolean()`)
    .with({ type: 'void' }, () => `z.void()`)
    .with({ type: 'string' }, mathed => {
      return ZodString.create({ value: mathed })
    })
    .with({ type: 'unknown' }, () => `z.unknown()`)
    .exhaustive()

  return withDescription(
    ZodOptional.create({ required, value: children }),
    value?.description
  )
}

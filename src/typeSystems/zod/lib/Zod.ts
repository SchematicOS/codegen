import { ZodString } from './ZodString.ts'
import { ZodArray } from './ZodArray.ts'
import { match } from 'ts-pattern'
import type { Stringable } from '@schematicos/types'
import { ZodRef } from './ZodRef.ts'
import { ZodObject } from './ZodObject.ts'
import { ZodUnion } from './ZodUnion.ts'
import { ZodIntersection } from './ZodIntersection.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { TypeSystemArgs } from 'generate/types.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Import } from 'generate/elements/Import.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasVoid } from 'parse/elements/schema/Void.ts'

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
      imports: [Import.create('zod', 'z')],
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
    .otherwise(matched => {
      console.log(`Unhandled value type: ${matched}`)

      return `z.unknown()`
    })

  return WithDescription.create({
    description: value?.description,
    value: Optional.create({
      required,
      value: children
    })
  })
}

type OptionalArgs = {
  required: boolean | undefined
  value: Stringable
}

class Optional implements Stringable {
  required: boolean | undefined
  value: Stringable

  private constructor({ required, value }: OptionalArgs) {
    this.required = required
    this.value = value
  }

  static create(args: OptionalArgs) {
    return new Optional(args)
  }

  toString() {
    return this.required ? `${this.value}` : `${this.value}.optional()`
  }
}

type WithDescriptionArgs = {
  description?: Stringable
  value: Stringable
}

class WithDescription implements Stringable {
  description?: Stringable
  value: Stringable

  constructor({ description, value }: WithDescriptionArgs) {
    this.description = description
    this.value = value
  }

  static create(args: WithDescriptionArgs) {
    return new WithDescription(args)
  }

  toString() {
    return this.description
      ? `/** ${this.description} */\n${this.value}`
      : `${this.value}`
  }
}

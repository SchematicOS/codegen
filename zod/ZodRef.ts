import { Identifier } from '../dsl/Identifier.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Stringable } from '../dsl/Stringable.ts'
import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

type ZodRefProps = {
  context: CoreContext
  destinationPath: string
  ref: OasRef<'schema'>
}

type ZodRefConstructorProps = {
  context: CoreContext
  destinationPath: string
  ref: OasRef<'schema'>
  identifier: Identifier
}

export class ZodRef extends SchematicBase implements Stringable {
  destinationPath: string
  ref: OasRef<'schema'>
  identifier: Identifier

  private constructor({
    context,
    destinationPath,
    ref,
    identifier
  }: ZodRefConstructorProps) {
    super({ context })

    this.destinationPath = destinationPath
    this.ref = ref
    this.identifier = identifier
  }

  static create({ context, destinationPath, ref }: ZodRefProps) {
    const identifier = Identifier.from$Ref({
      $ref: ref.$ref,
      context
    })

    return new ZodRef({
      context,
      destinationPath,
      ref,
      identifier
    })
  }

  toString() {
    return this.identifier.name
  }
}

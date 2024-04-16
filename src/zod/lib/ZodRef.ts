import { Identifier } from 'generate/elements/Identifier.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type { OasSchemaRef, Stringable } from '@schematicos/types'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'

type ZodRefProps = {
  context: GenerateContext
  destinationPath: string
  ref: OasSchemaRef
}

type ZodRefConstructorProps = {
  context: GenerateContext
  destinationPath: string
  ref: OasSchemaRef
  identifier: Identifier
}

export class ZodRef extends SchematicBase implements Stringable {
  destinationPath: string
  ref: OasSchemaRef
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

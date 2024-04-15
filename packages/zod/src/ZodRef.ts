import { Identifier } from 'jsr:@schematicos/generate@0.0.14/Identifier';
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.14/GenerateContext';
import type { OasSchemaRef, Stringable } from 'npm:@schematicos/types@0.0.34'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.14/SchematicBase';

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

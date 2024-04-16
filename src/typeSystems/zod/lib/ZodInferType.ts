import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Identifier } from 'generate/elements/Identifier.ts'
import type { OasSchema, OasSchemaRef, OasVoid } from '@schematicos/types'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'

type ZodInferTypeArgs = {
  context: GenerateContext
  value: Identifier | OasSchema | OasSchemaRef | OasVoid
}

export class ZodInferType extends SchematicBase {
  value: Identifier | OasSchema | OasSchemaRef | OasVoid

  private constructor({ context, value }: ZodInferTypeArgs) {
    super({ context })

    this.value = value
  }

  static create({ context, value }: ZodInferTypeArgs): ZodInferType {
    return new ZodInferType({ context, value })
  }

  toString(): string {
    return `z.infer<typeof ${this.value}>`
  }
}

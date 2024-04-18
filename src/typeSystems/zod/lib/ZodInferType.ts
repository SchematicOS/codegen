import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'
import type { GenerateContext } from 'core/lib/GenerateContext.ts'

type ZodInferTypeArgs = {
  context: GenerateContext
  value: Stringable
}

export class ZodInferType extends SchematicBase {
  value: Stringable

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

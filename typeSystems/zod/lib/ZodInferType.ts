import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from 'types'
import type { CoreContext } from 'context/CoreContext.ts'

type ZodInferTypeArgs = {
  context: CoreContext
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

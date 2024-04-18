import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type { Stringable } from '@schematicos/types'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

type ZodArrayArgs = {
  context: GenerateContext
  destinationPath: string
  items: OasSchema | OasRef<'schema'>
}

export class ZodArray implements Stringable {
  items: Stringable

  private constructor({ context, destinationPath, items }: ZodArrayArgs) {
    this.items = context.toTypeSystem({
      destinationPath,
      value: items,
      required: true
    })
  }

  static create(args: ZodArrayArgs) {
    return new ZodArray(args)
  }

  toString() {
    return `z.array(${this.items})`
  }
}

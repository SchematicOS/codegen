import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.14/GenerateContext'
import type { OasSchema, OasSchemaRef, Stringable } from 'npm:@schematicos/types@0.0.34'

type ZodArrayArgs = {
  context: GenerateContext
  destinationPath: string
  items: OasSchema | OasSchemaRef
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

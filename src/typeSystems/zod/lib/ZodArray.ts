import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type {
  OasSchemaData,
  OasSchemaRefData,
  Stringable
} from '@schematicos/types'

type ZodArrayArgs = {
  context: GenerateContext
  destinationPath: string
  items: OasSchemaData | OasSchemaRefData
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

import type { CoreContext } from '../context/CoreContext.ts'
import type { Stringable } from '../dsl/Stringable.ts'
import type { OasRef } from '../oas-elements/Ref.ts'
import type { OasSchema } from '../oas-schema/types.ts'

type ZodArrayArgs = {
  context: CoreContext
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

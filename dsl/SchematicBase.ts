import type { RegisterArgs } from '../context/GenerateContext.ts'
import { EMPTY } from './constants.ts'
import type { Stringable } from '../schematic-types/stringable.ts'
import type { CoreContext } from '../context/CoreContext.ts'

type SchematicBaseArgs = {
  context: CoreContext
  children?: Stringable | Stringable[]
}

export class SchematicBase implements Stringable {
  context: CoreContext
  children: Stringable[] = []

  constructor({ context, children = [] }: SchematicBaseArgs) {
    this.context = context

    this.children = this.children.concat(children)
  }

  renderChildren(separator: string = ''): string {
    return this.children
      .filter(child => child !== EMPTY)
      .map(child => child.toString())
      .join(separator)
  }

  register(args: RegisterArgs) {
    this.context.register(args)
  }
}

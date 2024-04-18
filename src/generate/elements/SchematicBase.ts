import type { GenerateContext, RegisterArgs } from 'core/lib/GenerateContext.ts'
import { EMPTY } from '../constants.ts'
import type { Stringable } from '@schematicos/types'

type SchenmaticBaseArgs = {
  context: GenerateContext
  children?: Stringable | Stringable[]
}

export class SchematicBase implements Stringable {
  context: GenerateContext
  children: Stringable[] = []

  constructor({ context, children = [] }: SchenmaticBaseArgs) {
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

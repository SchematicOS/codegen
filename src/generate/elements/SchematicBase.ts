import type { GenerateContext } from '../lib/GenerateContext.ts'
import { EMPTY } from '../lib/constants.ts'
import type { Stringable } from '@schematicos/types'

type SchenmaticBaseArgs = {
  context: GenerateContext
  children?: Stringable[]
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
}

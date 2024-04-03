import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'
import { match } from 'ts-pattern'

export type ListProps = {
  wrapper?: 'object' | 'array'
  separator?: string
}

export class List extends BaseNode<ListProps> {
  type: 'list'

  constructor(props: ListProps, root: Container) {
    super(props, root)

    this.type = 'list'
  }

  appendChild(child: Instance | TextInstance) {
    this.children.push(child)
  }

  removeChild(child: Instance | TextInstance) {
    const index = this.children.indexOf(child)

    this.children.splice(index, 1)
  }

  toString(): string {
    const { separator, wrapper } = this.props

    const mapped = this.children.map(child => {
      return `${child}`
    })

    const joined = mapped.join(separator ?? '')

    const out = match(wrapper)
      .with('object', () => `{${joined}}`)
      .with('array', () => `[${joined}]`)
      .otherwise(() => `${joined}`)

    return out
  }
}

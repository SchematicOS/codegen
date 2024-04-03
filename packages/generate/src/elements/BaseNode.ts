import { Container } from '@/elements/Container.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'
import { Stringable } from '@schematicos/types'

export class BaseNode<Props extends Record<string, any>> implements Stringable {
  root: Container
  props: Props
  children: (Instance | TextInstance)[]

  constructor(props: Props, root: Container) {
    this.root = root
    this.props = props
    this.children = []
  }

  appendChild(child: Instance | TextInstance) {
    // console.log('appendChild to container', child)
    this.children.push(child)
  }

  removeChild(child: Instance | TextInstance) {
    const index = this.children.indexOf(child)

    this.children.splice(index, 1)
  }

  toString(): string {
    return this.children.map(child => child.toString()).join('')
  }
}

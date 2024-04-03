import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'

export type ValueProps = Record<string, never>

export class Value extends BaseNode<ValueProps> {
  type: 'value'

  constructor(props: ValueProps, root: Container) {
    super(props, root)

    // console.log('CREATE VALUE ELEMENT', props, root)

    this.type = 'value'
  }

  appendChild(child: Instance | TextInstance) {
    // console.log('APPEND CHILD TO VALUE', child)
    // console.log('appendChild to container', child)
    this.children.push(child)
  }

  removeChild(child: Instance | TextInstance) {
    // console.log('REMOVE CHILD FROM VALUE', child)

    const index = this.children.indexOf(child)

    this.children.splice(index, 1)
  }

  toString(): string {
    const joined = this.children.map(child => `${child}`).join('\n')

    // console.log('VALUE TO STRING: ', joined)

    return joined
  }
}

import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'
import { ImportName } from '@schematicos/types'

export type ImportProps = {
  names: ImportName[]
  from: string
}

export class Import extends BaseNode<ImportProps> {
  type: 'import'

  constructor(props: ImportProps, root: Container) {
    super(props, root)

    this.type = 'import'
  }

  appendChild(child: Instance | TextInstance) {
    this.children.push(child)
  }

  removeChild(child: Instance | TextInstance) {
    const index = this.children.indexOf(child)

    this.children.splice(index, 1)
  }

  toString(): string {
    return ''
    // const { separator, wrapper } = this.props

    // const mapped = this.children.map(child => {
    //   return `${child}`
    // })

    // const joined = mapped.join(separator ?? '')

    // const out = match(wrapper)
    //   .with('object', () => `{${joined}}`)
    //   .with('array', () => `[${joined}]`)
    //   .otherwise(() => `${joined}`)

    // return out
  }
}

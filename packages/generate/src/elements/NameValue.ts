import { needsWrapping } from '@/lib/needsWrapping.ts'
import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'

export type NameValueProps = {
  name: string
  parentPath?: string
}

export class NameValue extends BaseNode<NameValueProps> {
  type: 'nameValue'

  constructor(props: NameValueProps, root: Container) {
    super(props, root)

    this.type = 'nameValue'
  }

  toString(): string {
    const value = this.children.map(child => `${child}`).join('')

    const { name, parentPath } = this.props

    const wrappedName = needsWrapping(name) ? `'${name}'` : name
    const v = parentPath
      ? typeof value === 'string' && needsWrapping(value)
        ? `${parentPath}['${value}']`
        : `${parentPath}.${value}`
      : value

    return `${wrappedName}: ${v}`
  }
}

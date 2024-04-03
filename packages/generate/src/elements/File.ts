import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { Instance } from '@/elements/createInstance.ts'
import { TextInstance } from '@/elements/TextInstance.ts'

export type FileProps = {
  destination: string
}

export class File extends BaseNode<FileProps> {
  type: 'file'

  constructor(props: FileProps, root: Container) {
    super(props, root)

    this.type = 'file'
  }

  appendChild(child: Instance | TextInstance): void {
    // console.log(`FILE APPEND CHILD : ${instanceType(child)} `)

    this.root.ctx.registerContent({
      destination: this.props.destination,
      content: child
    })
  }

  removeChild(child: Instance | TextInstance): void {
    const files = this.root.ctx.files.get(this.props.destination)

    if (!files) {
      return
    }

    const index = files.content.indexOf(child)

    this.children.splice(index, 1)
  }

  toString(): string {
    return ''
  }
}

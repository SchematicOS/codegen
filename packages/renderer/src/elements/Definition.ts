import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'
import { Identifier } from '@schematicos/generate'

export type DefinitionProps = {
  identifier: Identifier
  destination: string
}

export class Definition extends BaseNode<DefinitionProps> {
  type: 'definition'

  constructor(props: DefinitionProps, root: Container) {
    super(props, root)

    this.type = 'definition'
  }

  appendChild(child: Instance | TextInstance) {
    this.root.ctx.registerDefinition({
      destination: this.props.destination,
      definition: {
        identifier: this.props.identifier,
        renderedValue: child
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeChild(_child: Instance | TextInstance) {
    const files = this.root.ctx.files.get(this.props.destination)

    if (!files) {
      return
    }

    files.definitions.delete(this.props.identifier.toImportName())
  }

  toString(): string {
    return ''
  }
}

import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { Identifier } from '@schematicos/generate'

export type TypeNameProps = {
  identifier: Identifier
}

export class TypeName extends BaseNode<TypeNameProps> {
  type: 'typeName'

  constructor(props: TypeNameProps, root: Container) {
    super(props, root)

    this.type = 'typeName'
  }

  toString(): string {
    return this.props.identifier.toLabelName()
  }
}

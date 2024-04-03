import { BaseNode } from '@/elements/BaseNode.ts'
import { Container } from '@/elements/Container.ts'
import { Identifier } from '@schematicos/generate'
import { match } from 'ts-pattern'

export type TypeDefinitionProps = {
  identifier: Identifier
}

export class TypeDefinition extends BaseNode<TypeDefinitionProps> {
  type: 'typeDefinition'

  constructor(props: TypeDefinitionProps, root: Container) {
    super(props, root)

    this.type = 'typeDefinition'
  }

  toString(): string {
    const { identifier } = this.props

    if (identifier.type === 'static') {
      throw new Error('Static identifiers cannot be used in TypeDefinition')
    }

    return `export ${match(identifier.type)
      .with('type', () => 'type')
      .with('value', () => 'const')
      .exhaustive()} ${identifier} = ${this.children.map(child => `${child}`).join('')}\n`
  }
}

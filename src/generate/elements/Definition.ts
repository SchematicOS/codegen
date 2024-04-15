import type { GenerateContext } from '../lib/GenerateContext.ts'
import { Identifier } from './Identifier.ts'
import type { IdentifierType } from './Identifier.ts'
import { SchematicBase } from './SchematicBase.ts'
import type { OasSchemaRef, Stringable } from '@schematicos/types'
import { match } from 'ts-pattern'

type DefinitionArgs = {
  context: GenerateContext
  value: Stringable
  identifier: Identifier
  destinationPath: string
}

type FromRefArgs = {
  context: GenerateContext
  ref: OasSchemaRef
  destinationPath: string
}

export class Definition extends SchematicBase implements Stringable {
  value: Stringable
  identifier: Identifier
  destinationPath: string

  private constructor({
    context,
    identifier,
    value,
    destinationPath
  }: DefinitionArgs) {
    super({ context })

    this.identifier = identifier
    this.value = value
    this.destinationPath = destinationPath
  }

  static create({
    context,
    identifier,
    value,
    destinationPath
  }: DefinitionArgs): Definition {
    return new Definition({
      context,
      identifier,
      value,
      destinationPath
    })
  }

  static fromRef({ context, ref, destinationPath }: FromRefArgs): Definition {
    const identifier = Identifier.from$Ref({
      $ref: ref.$ref,
      context
    })

    return new Definition({
      context,
      identifier,
      value: context.resolveRefSingle(ref),
      destinationPath
    })
  }

  isSelected(): boolean {
    return this.identifier.modelSettings.isSelected()
  }

  getExportPath(): string {
    return this.identifier.modelSettings.getExportPath()
  }

  isImported(): boolean {
    return this.identifier.isImported(this.destinationPath)
  }

  toString(): string {
    return `export ${toTypeKeyword(
      this.identifier.type
    )} ${this.identifier.toString()} = ${this.value};`
  }
}

const toTypeKeyword = (type: IdentifierType) => {
  return match(type)
    .with('type', () => 'type')
    .with('value', () => 'const')
    .exhaustive()
}

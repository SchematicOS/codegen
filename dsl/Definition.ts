import type { Stringable } from '../schematicTypes/stringable.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Identifier } from './Identifier.ts'
import { SchematicBase } from './SchematicBase.ts'
import type { OasRef } from '../oasElements/Ref.ts'
import type { OasSchema } from '../oasSchema/types.ts'
import type { OasVoid } from '../oasSchema/Void.ts'
import { withDescription } from '../typescript/withDescription.ts'

type ConstructorArgs = {
  context: CoreContext
  children: Stringable
  identifier: Identifier
  description: string | undefined
  destinationPath: string
}

type FromValueArgs = {
  context: CoreContext
  identifier: Identifier
  value: OasSchema | OasRef<'schema'> | OasVoid
  description: string | undefined
  destinationPath: string
}

export class Definition extends SchematicBase implements Stringable {
  identifier: Identifier
  description: string | undefined
  destinationPath: string

  private constructor({
    context,
    identifier,
    children,
    description,
    destinationPath
  }: ConstructorArgs) {
    super({ context, children })

    this.identifier = identifier
    this.description = description
    this.destinationPath = destinationPath
  }

  static create({
    context,
    children,
    identifier,
    description,
    destinationPath
  }: ConstructorArgs): Definition {
    return new Definition({
      context,
      children,
      identifier,
      description,
      destinationPath
    })
  }

  static fromValue({
    context,
    identifier,
    value,
    description,
    destinationPath
  }: FromValueArgs): Definition {
    const children = context.toTypeSystem({
      value,
      required: true,
      destinationPath
    })

    return new Definition({
      context,
      identifier,
      children,
      description,
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
    // @TODO move syntax to typescript package to enable language agnostic use
    return withDescription(
      `export ${this.identifier.type} ${this.identifier} = ${this.children};`,
      this.description
    )
  }
}

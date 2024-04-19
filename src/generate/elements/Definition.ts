import type { Stringable } from '@schematicos/types'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { Identifier } from './Identifier.ts'
import { SchematicBase } from './SchematicBase.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { OasVoid } from 'parse/elements/schema/Void.ts'

type ConstructorArgs = {
  context: CoreContext
  children: Stringable
  identifier: Identifier
  destinationPath: string
}

type FromRefArgs = {
  context: CoreContext
  ref: OasRef<'schema'>
  destinationPath: string
}

type FromValueArgs = {
  context: CoreContext
  identifier: Identifier
  value: OasSchema | OasRef<'schema'> | OasVoid
  destinationPath: string
}

export class Definition extends SchematicBase implements Stringable {
  identifier: Identifier
  destinationPath: string

  private constructor({
    context,
    identifier,
    children,
    destinationPath
  }: ConstructorArgs) {
    super({ context, children })

    this.identifier = identifier
    this.destinationPath = destinationPath
  }

  static create({
    context,
    children,
    identifier,
    destinationPath
  }: ConstructorArgs): Definition {
    return new Definition({
      context,
      children,
      identifier,
      destinationPath
    })
  }

  static fromRef({ context, ref, destinationPath }: FromRefArgs): Definition {
    const identifier = Identifier.from$Ref({
      $ref: ref.$ref,
      context
    })

    const resolved = ref.resolveOnce()

    return Definition.fromValue({
      context,
      identifier,
      value: resolved,
      destinationPath
    })
  }

  static fromValue({
    context,
    identifier,
    value,
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
    return `export ${this.identifier.type} ${this.identifier} = ${this.children};`
  }
}

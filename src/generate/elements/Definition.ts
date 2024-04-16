import type {
  OasSchema,
  OasVoid,
  OasSchemaRef,
  Stringable
} from '@schematicos/types'
import type { GenerateContext } from '../context/GenerateContext.ts'
import { Identifier } from './Identifier.ts'
import { SchematicBase } from './SchematicBase.ts'

type ConstructorArgs = {
  context: GenerateContext
  children: Stringable
  identifier: Identifier
  destinationPath: string
}

type FromRefArgs = {
  context: GenerateContext
  ref: OasSchemaRef
  destinationPath: string
}

type FromValueArgs = {
  context: GenerateContext
  identifier: Identifier
  value: OasSchema | OasSchemaRef | OasVoid
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

    const resolved = context.resolveRefSingle(ref)

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

import type { GenerateContext } from '../lib/GenerateContext.ts'
import { Identifier } from './Identifier.ts'
import type { IdentifierType } from './Identifier.ts'
import { SchematicBase } from './SchematicBase.ts'
import type {
  OasSchema,
  OasSchemaRef,
  OasVoid,
  Stringable
} from 'npm:@schematicos/types@0.0.34'
import { match } from 'npm:ts-pattern@5.1.1'

type ModelArgs = {
  context: GenerateContext
  value: OasSchema | OasSchemaRef | OasVoid
  identifier: Identifier
  destinationPath: string
}

type FromRefArgs = {
  context: GenerateContext
  ref: OasSchemaRef
  destinationPath: string
}

export class Model extends SchematicBase implements Stringable {
  value: OasSchema | OasSchemaRef | OasVoid
  identifier: Identifier
  destinationPath: string

  private constructor({
    context,
    identifier,
    value,
    destinationPath
  }: ModelArgs) {
    super({ context })

    this.identifier = identifier
    this.value = value
    this.destinationPath = destinationPath

    const child = this.context.toTypeSystem({
      value,
      required: true,
      destinationPath
    })

    this.children.push(child)
  }

  static create({ context, identifier, value, destinationPath }: ModelArgs):Model {
    return new Model({
      context,
      identifier,
      value,
      destinationPath
    })
  }

  static fromRef({ context, ref, destinationPath }: FromRefArgs):Model {
    const identifier = Identifier.from$Ref({
      $ref: ref.$ref,
      context
    })

    return new Model({
      context,
      identifier,
      value: context.resolveRefSingle(ref),
      destinationPath
    })
  }

  isSelected():boolean {
    return this.identifier.modelSettings.isSelected()
  }

  getExportPath():string {
    return this.identifier.modelSettings.getExportPath()
  }

  isImported():boolean {
    return this.identifier.isImported(this.destinationPath)
  }

  toString():string {
    return `export ${toTypeKeyword(this.identifier.type)} ${this.identifier.toString()} = ${this.renderChildren()};`
  }
}

const toTypeKeyword = (type: IdentifierType) => {
  return match(type)
    .with('type', () => 'type')
    .with('value', () => 'const')
    .exhaustive()
}

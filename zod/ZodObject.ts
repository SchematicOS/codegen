import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Stringable } from '../dsl/Stringable.ts'
import isEmpty from 'lodash-es/isEmpty.js'
import type { OasRef } from '../oas-elements/Ref.ts'
import type { OasSchema } from '../oas-schema/types.ts'
import type { OasObject } from '../oas-schema/Object.ts'
import { handleKey } from '../typescript/identifiers.ts'

type ZodObjectProps = {
  context: CoreContext
  destinationPath: string
  value: OasObject
}

export class ZodObject extends SchematicBase implements Stringable {
  value: OasObject
  recordProperties: ZodRecord | null
  objectProperties: ZodObjectProperties | null

  private constructor({ context, destinationPath, value }: ZodObjectProps) {
    super({ context })

    this.value = value

    const { properties, required, additionalProperties } = this.value

    this.recordProperties = additionalProperties
      ? ZodRecord.create({
          context,
          destinationPath,
          value: additionalProperties
        })
      : null

    this.objectProperties = properties
      ? ZodObjectProperties.create({
          context,
          destinationPath,
          properties,
          required
        })
      : null
  }

  static create(args: ZodObjectProps) {
    return new ZodObject(args)
  }

  toString() {
    const { objectProperties, recordProperties } = this

    if (objectProperties && recordProperties) {
      return `z.union([${objectProperties}, ${recordProperties}])`
    }

    return (
      recordProperties?.toString() ??
      objectProperties?.toString() ??
      'z.object({})'
    )
  }
}

type ZodObjectPropertiesArgs = {
  context: CoreContext
  destinationPath: string
  properties: Record<string, OasSchema | OasRef<'schema'>>
  required: OasObject['required']
}

class ZodObjectProperties extends SchematicBase implements Stringable {
  properties: Record<string, OasSchema | OasRef<'schema'>>
  required: string[]

  private constructor({
    context,
    destinationPath,
    properties,
    required = []
  }: ZodObjectPropertiesArgs) {
    super({ context })

    this.properties = properties
    this.required = required

    this.children = Object.entries(properties ?? {}).map(([key, property]) => {
      const value = context.toTypeSystem({
        destinationPath,
        value: property,
        required: required?.includes(key)
      })

      return `${handleKey(key)}: ${value}`
    })
  }

  static create(args: ZodObjectPropertiesArgs) {
    return new ZodObjectProperties(args)
  }

  toString() {
    return `z.object({${this.renderChildren(',\n')}})`
  }
}

type ZodRecordArgs = {
  context: CoreContext
  destinationPath: string
  value: true | OasSchema | OasRef<'schema'>
}

class ZodRecord extends SchematicBase implements Stringable {
  value: true | OasSchema | OasRef<'schema'>

  private constructor({ context, destinationPath, value }: ZodRecordArgs) {
    super({ context })

    this.value = value

    const children = toZodRecordChildren({ context, destinationPath, value })
    this.children.push(children)
  }

  static create(args: ZodRecordArgs) {
    const instance = new ZodRecord(args)

    return instance
  }

  toString() {
    return `z.record(z.string(), ${this.renderChildren()})`
  }
}

const toZodRecordChildren = ({
  context,
  destinationPath,
  value
}: ZodRecordArgs) => {
  if (value === true) {
    return 'true'
  }
  if (isEmptyObject(value)) {
    return 'true'
  }

  return context.toTypeSystem({
    destinationPath,
    value,
    required: true
  })
}

const isEmptyObject = (value: unknown): value is Record<string, never> => {
  return isEmpty(value)
}

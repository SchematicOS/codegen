import { OasBase } from '../oasElements/OasBase.ts'
import { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasRef } from '../oasElements/Ref.ts'
import type { OasSchema } from './types.ts'

export type OasObjectFields = {
  title?: string
  description?: string
  properties?: Record<string, OasSchema | OasRef<'schema'>>
  required: string[] | undefined
  additionalProperties?: boolean | OasSchema | OasRef<'schema'>
}

type FromFieldsArgs = {
  fields: OasObjectFields
  context: CoreContext
}

type ToObjectV3Args = {
  fields: OasObjectFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasObject extends OasBase {
  schematicType: 'schema' = 'schema'
  type: 'object' = 'object'
  fields: OasObjectFields

  private constructor({ fields, trail, skipped, context }: ToObjectV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToObjectV3Args): OasObject {
    return new OasObject({ fields, trail, context, skipped })
  }

  static fromFields({ fields, context }: FromFieldsArgs): OasObject {
    return new OasObject({
      fields,
      trail: Trail.create(),
      context,
      skipped: {}
    })
  }

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get properties(): Record<string, OasSchema | OasRef<'schema'>> | undefined {
    return this.fields.properties
  }

  get required(): string[] | undefined {
    return this.fields.required
  }

  get additionalProperties():
    | boolean
    | OasSchema
    | OasRef<'schema'>
    | undefined {
    return this.fields.additionalProperties
  }

  isRef(): this is OasRef<'schema'> {
    return false
  }

  resolve(): OasObject {
    return this
  }
}

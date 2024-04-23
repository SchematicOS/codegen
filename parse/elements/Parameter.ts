import { OasBase } from './OasBase.ts'
import type { OasParameterLocation } from '@schematicos/types'
import type { Trail } from 'context/Trail.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import type { OasMediaType } from './MediaType.ts'
import type { OasRef } from './Ref.ts'
import type { OasExample } from './Example.ts'
import type { OasSchema } from './schema/types.ts'

export type ParameterFields = {
  name: string
  location: OasParameterLocation
  description: string | undefined
  required: boolean | undefined
  deprecated: boolean | undefined
  allowEmptyValue: boolean | undefined
  schema: OasSchema | OasRef<'schema'> | undefined
  examples: Record<string, OasExample | OasRef<'example'>> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToParameterV3Args = {
  fields: ParameterFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasParameter extends OasBase {
  schematicType: 'parameter' = 'parameter'
  fields: ParameterFields

  private constructor({ fields, trail, skipped, context }: ToParameterV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToParameterV3Args): OasParameter {
    return new OasParameter({ fields, trail, context, skipped })
  }

  get name(): string {
    return this.fields.name
  }

  get location(): OasParameterLocation {
    return this.fields.location
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get required(): boolean | undefined {
    return this.fields.required
  }

  get deprecated(): boolean | undefined {
    return this.fields.deprecated
  }

  get allowEmptyValue(): boolean | undefined {
    return this.fields.allowEmptyValue
  }

  get schema(): OasSchema | OasRef<'schema'> | undefined {
    return this.fields.schema
  }

  get examples(): Record<string, OasExample | OasRef<'example'>> | undefined {
    return this.fields.examples
  }

  get content(): Record<string, OasMediaType> | undefined {
    return this.fields.content
  }

  isRef(): this is OasRef<'parameter'> {
    return false
  }

  resolve(): OasParameter {
    return this
  }

  toSchema(
    mediaType: string = 'application/json'
  ): OasSchema | OasRef<'schema'> | undefined {
    if (this.schema) {
      return this.schema
    }

    return this.fields.content?.[mediaType]?.schema
  }
}

import type { CoreContext } from '../context/CoreContext.ts'
import type { Trail } from '../context/Trail.ts'
import { OasBase } from './OasBase.ts'
import type { OasMediaType } from './MediaType.ts'
import type { OasRef } from './Ref.ts'
import type { OasExample } from './Example.ts'
import type { OasSchema } from '../oas-schema/types.ts'

export type HeaderFields = {
  description: string | undefined
  required: boolean | undefined
  deprecated: boolean | undefined
  allowEmptyValue: boolean | undefined
  schema: OasSchema | OasRef<'schema'> | undefined
  examples: Record<string, OasExample | OasRef<'example'>> | undefined
  content: Record<string, OasMediaType> | undefined
}

type ToHeaderV3Args = {
  fields: HeaderFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasHeader extends OasBase {
  schematicType: 'header' = 'header'
  fields: HeaderFields

  private constructor({ fields, trail, skipped, context }: ToHeaderV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToHeaderV3Args): OasHeader {
    return new OasHeader({ fields, trail, context, skipped })
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

  isRef(): this is OasRef<'header'> {
    return false
  }

  resolve(): OasHeader {
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

import type { CoreContext } from 'core/lib/CoreContext.ts'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { OasResponse } from 'parse/elements/Response.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import type { OasExample } from 'parse/elements/Example.ts'
import type { OasRequestBody } from 'parse/elements/RequestBody.ts'
import type { OasHeader } from 'parse/elements/Header.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'

export type ComponentsFields = {
  schemas?: Record<string, OasSchema | OasRef<'schema'>>
  responses?: Record<string, OasResponse | OasRef<'response'>>
  parameters?: Record<string, OasParameter | OasRef<'parameter'>>
  examples?: Record<string, OasExample | OasRef<'example'>>
  requestBodies?: Record<string, OasRequestBody | OasRef<'requestBody'>>
  headers?: Record<string, OasHeader | OasRef<'header'>>
}

type ToComponentsV3Args = {
  fields: ComponentsFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasComponents extends OasBase {
  schematicType: 'components' = 'components'
  fields: ComponentsFields

  private constructor({ fields, trail, skipped, context }: ToComponentsV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToComponentsV3Args): OasComponents {
    return new OasComponents({ fields, trail, context, skipped })
  }

  get schemas(): Record<string, OasSchema | OasRef<'schema'>> | undefined {
    return this.fields.schemas
  }

  get responses():
    | Record<string, OasResponse | OasRef<'response'>>
    | undefined {
    return this.fields.responses
  }

  get parameters():
    | Record<string, OasParameter | OasRef<'parameter'>>
    | undefined {
    return this.fields.parameters
  }

  get examples(): Record<string, OasExample | OasRef<'example'>> | undefined {
    return this.fields.examples
  }

  get requestBodies():
    | Record<string, OasRequestBody | OasRef<'requestBody'>>
    | undefined {
    return this.fields.requestBodies
  }

  get headers(): Record<string, OasHeader | OasRef<'header'>> | undefined {
    return this.fields.headers
  }
}

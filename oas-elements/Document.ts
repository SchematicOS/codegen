import type { CoreContext } from '../context/CoreContext.ts'
import type { Trail } from '../context/Trail.ts'
import { OasBase } from './OasBase.ts'
import type { OasTag } from './Tag.ts'
import type { OasComponents } from './Components.ts'
import type { OasOperation } from './Operation.ts'
import type { OasInfo } from './Info.ts'

export type DocumentFields = {
  openapi: string
  info: OasInfo
  operations: OasOperation[]
  components: OasComponents | undefined
  tags: OasTag[] | undefined
}

type ToDocumentV3Args = {
  fields: DocumentFields
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasDocument extends OasBase {
  schematicType: 'openapi' = 'openapi'
  fields: DocumentFields

  private constructor({ fields, trail, skipped, context }: ToDocumentV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({
    fields,
    trail,
    context,
    skipped
  }: ToDocumentV3Args): OasDocument {
    return new OasDocument({ fields, trail, context, skipped })
  }

  get openapi(): string {
    return this.fields.openapi
  }

  get info(): OasInfo {
    return this.fields.info
  }

  get operations(): OasOperation[] {
    return this.fields.operations
  }

  get components(): OasComponents | undefined {
    return this.fields.components
  }

  get tags(): OasTag[] | undefined {
    return this.fields.tags
  }
}

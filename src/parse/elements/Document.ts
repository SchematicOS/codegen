import type { ParseContext } from 'core/lib/ParseContext.ts'
import type { Trail } from 'core/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasTag } from 'parse/elements/Tag.ts'
import type { OasComponents } from 'parse/elements/Components.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasInfo } from 'parse/elements/Info.ts'

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
  context: ParseContext
}

export class OasDocument extends OasBase {
  schematicType: 'openapi' = 'openapi'
  fields: DocumentFields

  private constructor({ fields, trail, skipped, context }: ToDocumentV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToDocumentV3Args) {
    return new OasDocument({ fields, trail, context, skipped })
  }

  get openapi() {
    return this.fields.openapi
  }

  get info() {
    return this.fields.info
  }

  get operations() {
    return this.fields.operations
  }

  get components() {
    return this.fields.components
  }

  get tags() {
    return this.fields.tags
  }
}

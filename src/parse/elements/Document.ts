import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasDocumentData } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'
import type { Tag } from 'parse/elements/Tag.ts'
import type { Components } from 'parse/elements/Components.ts'
import type { Operation } from 'parse/elements/Operation.ts'
import type { Info } from 'parse/elements/Info.ts'

export type DocumentFields = {
  openapi: string
  info: Info
  operations: Operation[]
  components: Components | undefined
  tags: Tag[] | undefined
}

type ToDocumentV3Args = {
  fields: DocumentFields
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Document extends OasBase implements OasDocumentData {
  schematicType: 'openapi' = 'openapi'
  fields: DocumentFields

  private constructor({ fields, trail, skipped, context }: ToDocumentV3Args) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create({ fields, trail, context, skipped }: ToDocumentV3Args) {
    return new Document({ fields, trail, context, skipped })
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

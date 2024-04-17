import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { OasRoot } from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasBase } from 'parse/elements/OasBase.ts'

type ToDocumentV3Args = {
  fields: Omit<OasRoot, 'schematicType'>
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class Document extends OasBase implements OasRoot {
  schematicType: 'openapi' = 'openapi'
  fields: Omit<OasRoot, 'schematicType'>

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

import type { OpenAPIV3 } from 'openapi-types'
import type { OasTag } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'

export const toTagsV3 = (
  tags: OpenAPIV3.TagObject[],
  ctx: ParseContextType
): OasTag[] => {
  return tags.map(tag => {
    const { name, description, ...skipped } = tag

    ctx.notImplemented({ section: 'OPENAPI_V3_TAG', skipped })

    return {
      schematicType: 'tag',
      name,
      description
    }
  })
}

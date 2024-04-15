import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import type { OasTag } from 'npm:@schematicos/types@0.0.34'
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

import type { OpenAPIV3 } from 'openapi-types'
import type { OasTag } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToTagsV3Args = {
  tags: OpenAPIV3.TagObject[]
  trail: Trail
  context: ParseContext
}

export const toTagsV3 = ({ tags, context }: ToTagsV3Args): OasTag[] => {
  return tags.map(tag => {
    const { name, description, ...skipped } = tag

    context.notImplemented({ section: 'OPENAPI_V3_TAG', skipped })

    return {
      schematicType: 'tag',
      name,
      description
    }
  })
}

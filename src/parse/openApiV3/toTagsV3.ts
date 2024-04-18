import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasTag } from 'parse/elements/Tag.ts'
import type { TagFields } from 'parse/elements/Tag.ts'

type ToTagsV3Args = {
  tags: OpenAPIV3.TagObject[] | undefined
  trail: Trail
  context: ParseContext
}

export const toTagsV3 = ({
  tags,
  trail,
  context
}: ToTagsV3Args): OasTag[] | undefined => {
  if (!tags) {
    return undefined
  }

  return tags.map(tag => {
    const { name, description, ...skipped } = tag

    const fields: TagFields = {
      name,
      description
    }

    return OasTag.create({
      fields,
      trail,
      context,
      skipped
    })
  })
}

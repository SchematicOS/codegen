import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Trail } from '../context/Trail.ts'
import { OasTag } from '../oasElements/Tag.ts'
import type { TagFields } from '../oasElements/Tag.ts'

type ToTagsV3Args = {
  tags: OpenAPIV3.TagObject[] | undefined
  trail: Trail
  context: CoreContext
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

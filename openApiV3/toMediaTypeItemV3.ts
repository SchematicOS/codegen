import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from '../context/CoreContext.ts'
import { toOptionalSchemaV3 } from './toSchemasV3.ts'
import { toExamplesV3 } from './toExamplesV3.ts'
import type { Trail } from '../context/Trail.ts'
import { OasMediaType } from '../oasElements/MediaType.ts'
import type { MediaTypeFields } from '../oasElements/MediaType.ts'

type ToMediaTypeItemV3Args = {
  mediaTypeItem: OpenAPIV3.MediaTypeObject
  mediaType: string
  trail: Trail
  context: CoreContext
}

export const toMediaTypeItemV3 = ({
  mediaTypeItem,
  mediaType,
  trail,
  context
}: ToMediaTypeItemV3Args): OasMediaType => {
  const { schema, example, examples, ...skipped } = mediaTypeItem

  const fields: MediaTypeFields = {
    mediaType,
    schema: toOptionalSchemaV3({ schema, trail: trail.add('schema'), context }),
    examples: toExamplesV3({
      example,
      examples,
      exampleKey: mediaType,
      trail: trail.add('examples'),
      context
    })
  }

  return OasMediaType.create({ fields, trail, skipped, context })
}

type ToMediaTypeItemsV3Args = {
  content: Record<string, OpenAPIV3.MediaTypeObject>
  trail: Trail
  context: CoreContext
}

export const toMediaTypeItemsV3 = ({
  content,
  trail,
  context
}: ToMediaTypeItemsV3Args): Record<string, OasMediaType> => {
  return Object.fromEntries(
    Object.entries(content).map(([mediaType, value]) => {
      return [
        mediaType,
        toMediaTypeItemV3({
          mediaTypeItem: value,
          mediaType,
          trail: trail.add(mediaType),
          context
        })
      ]
    })
  )
}

type ToOptionalMediaTypeItemsV3Args = {
  content: Record<string, OpenAPIV3.MediaTypeObject> | undefined
  trail: Trail
  context: CoreContext
}

export const toOptionalMediaTypeItemsV3 = ({
  content,
  trail,
  context
}: ToOptionalMediaTypeItemsV3Args):
  | Record<string, OasMediaType>
  | undefined => {
  if (!content) {
    return
  }

  return toMediaTypeItemsV3({ content, trail, context })
}

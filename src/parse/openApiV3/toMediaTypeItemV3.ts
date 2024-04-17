import type { OpenAPIV3 } from 'openapi-types'
import type { OasMediaTypeItem } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import { toExamplesV3 } from './toExamplesV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { OasContent } from '@schematicos/types'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { MediaType } from 'parse/elements/MediaType.ts'

type ToMediaTypeItemV3Args = {
  mediaTypeItem: OpenAPIV3.MediaTypeObject
  mediaType: string
  trail: Trail
  context: ParseContext
}

export const toMediaTypeItemV3 = ({
  mediaTypeItem,
  mediaType,
  trail,
  context
}: ToMediaTypeItemV3Args): OasMediaTypeItem => {
  const { schema, example, examples, ...skipped } = mediaTypeItem

  const fields = stripUndefined({
    mediaType: mediaType,
    schema: schema
      ? toSchemaV3({ schema, trail: trail.add('schema'), context })
      : undefined,
    examples: toExamplesV3({
      example,
      examples,
      exampleKey: mediaType,
      trail: trail.add('examples'),
      context
    })
  })

  return MediaType.create({ fields, trail, skipped, context })
}

type ToMediaTypeItemsV3Args = {
  content: Record<string, OpenAPIV3.MediaTypeObject>
  trail: Trail
  context: ParseContext
}

export const toMediaTypeItemsV3 = ({
  content,
  trail,
  context
}: ToMediaTypeItemsV3Args): OasContent => {
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

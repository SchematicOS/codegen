import type { OpenAPIV3 } from 'openapi-types'
import type { OasMediaTypeItem } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import { toExamplesV3 } from './toExamplesV3.ts'

type ToMediaTypeItemV3Args = {
  mediaTypeItem: OpenAPIV3.MediaTypeObject
  mediaType: string
  path: string[]
  context: ParseContextType
}

export const toMediaTypeItemV3 = ({
  mediaTypeItem,
  mediaType,
  path,
  context
}: ToMediaTypeItemV3Args): OasMediaTypeItem => {
  const { schema, example, examples, ...skipped } = mediaTypeItem

  context.notImplemented({ section: 'OPENAPI_V3_MEDIA_TYPE_ITEM', skipped })

  return {
    schematicType: 'mediaType',
    mediaType: mediaType,
    schema: schema
      ? toSchemaV3({ schema, path: path.concat('schema'), context })
      : undefined,
    examples: toExamplesV3(
      { example, examples, exampleKey: mediaType },
      context
    )
  }
}

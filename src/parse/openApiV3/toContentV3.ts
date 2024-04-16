import type { OpenAPIV3 } from 'openapi-types'
import type { OasContent } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { toMediaTypeItemV3 } from './toMediaTypeItemV3.ts'

type ToContentV3Args = {
  content: Record<string, OpenAPIV3.MediaTypeObject>
  path: string[]
  context: ParseContextType
}

export const toContentV3 = ({
  content,
  path,
  context
}: ToContentV3Args): OasContent => {
  return Object.fromEntries(
    Object.entries(content).map(([mediaType, value]) => {
      return [
        mediaType,
        toMediaTypeItemV3({
          mediaTypeItem: value,
          mediaType,
          path: path.concat(mediaType),
          context
        })
      ]
    })
  )
}

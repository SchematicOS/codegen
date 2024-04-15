import type { OpenAPIV3 } from 'openapi-types'
import type { OasContent } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'
import { toMediaTypeItemV3 } from './toMediaTypeItemV3.ts'

export const toContentV3 = (
  content: Record<string, OpenAPIV3.MediaTypeObject>,
  ctx: ParseContextType
): OasContent => {
  return Object.fromEntries(
    Object.entries(content).map(([mediaType, value]) => {
      return [mediaType, toMediaTypeItemV3(value, mediaType, ctx)]
    })
  )
}

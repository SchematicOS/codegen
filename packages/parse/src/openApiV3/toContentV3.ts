import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import type { OasContent } from 'npm:@schematicos/types@0.0.34'
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

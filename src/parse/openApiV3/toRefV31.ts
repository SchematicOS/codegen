import type { OpenAPIV3_1 } from 'openapi-types'
import type { OasRef } from '@schematicos/types'
import type { ParseContextType, RefReturn } from '../lib/types.ts'

export const toRefV31 = <T extends OasRef['refType']>(
  ref: OpenAPIV3_1.ReferenceObject,
  refType: T,
  ctx: ParseContextType
): RefReturn<T> => {
  const { $ref, summary, description, ...skipped } = ref

  ctx.notImplemented({ section: 'OPENAPI_V3_REF', skipped })

  return {
    schematicType: 'ref',
    refType,
    $ref,
    summary,
    description
  } as RefReturn<T>
}

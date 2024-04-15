import type { OpenAPIV3_1 } from 'npm:openapi-types@12.1.3'
import type { OasRef } from 'npm:@schematicos/types@0.0.34'
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

import type { OpenAPIV3_1 } from 'openapi-types'
import type { OasRef } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { RefReturn } from 'parse/lib/types.ts'

type ToRefV31Args<T extends OasRef['refType']> = {
  ref: OpenAPIV3_1.ReferenceObject
  refType: T
  trail: Trail
  context: ParseContext
}

export const toRefV31 = <T extends OasRef['refType']>({
  ref,
  refType,
  context
}: ToRefV31Args<T>): RefReturn<T> => {
  const { $ref, summary, description, ...skipped } = ref

  context.notImplemented({ section: 'OPENAPI_V3_REF', skipped })

  return {
    schematicType: 'ref',
    refType,
    $ref,
    summary,
    description
  } as RefReturn<T>
}

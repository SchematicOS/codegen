import type { OpenAPIV3_1 } from 'openapi-types'
import type { OasRef } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import type { RefReturn } from 'parse/lib/types.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Ref } from 'parse/elements/Ref.ts'

type ToRefV31Args<T extends OasRef['refType']> = {
  ref: OpenAPIV3_1.ReferenceObject
  refType: T
  trail: Trail
  context: ParseContext
}

export const toRefV31 = <T extends OasRef['refType']>({
  ref,
  refType,
  trail,
  context
}: ToRefV31Args<T>): RefReturn<T> => {
  const { $ref, summary, description, ...skipped } = ref

  const fields = stripUndefined({
    refType: refType as OasRef['refType'],
    $ref,
    summary,
    description
  })

  return Ref.create({
    fields,
    trail,
    context,
    skipped
  }) as unknown as RefReturn<T>
}

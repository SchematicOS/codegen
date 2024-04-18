import type { OpenAPIV3_1 } from 'openapi-types'
import type { OasRefData } from '@schematicos/types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Ref } from 'parse/elements/Ref.ts'
import type { RefFields } from 'parse/elements/Ref.ts'

type ToRefV31Args<T extends OasRefData['refType']> = {
  ref: OpenAPIV3_1.ReferenceObject
  refType: T
  trail: Trail
  context: ParseContext
}

export const toRefV31 = <T extends OasRefData['refType']>({
  ref,
  refType,
  trail,
  context
}: ToRefV31Args<T>): Ref<T> => {
  const { $ref, summary, description, ...skipped } = ref

  const fields: RefFields<T> = {
    refType,
    $ref,
    summary,
    description
  }

  return Ref.create({
    fields,
    trail,
    context,
    skipped
  })
}

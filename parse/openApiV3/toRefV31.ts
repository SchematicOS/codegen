import type { OpenAPIV3_1 } from 'openapi-types'
import type { OasRefData } from '@schematicos/types'
import type { CoreContext } from 'context/CoreContext.ts'
import type { Trail } from 'context/Trail.ts'
import { OasRef } from '../elements/Ref.ts'
import type { RefFields } from '../elements/Ref.ts'

type ToRefV31Args<T extends OasRefData['refType']> = {
  ref: OpenAPIV3_1.ReferenceObject
  refType: T
  trail: Trail
  context: CoreContext
}

export const toRefV31 = <T extends OasRefData['refType']>({
  ref,
  refType,
  trail,
  context
}: ToRefV31Args<T>): OasRef<T> => {
  const { $ref, summary, description, ...skipped } = ref

  const fields: RefFields<T> = {
    refType,
    $ref,
    summary,
    description
  }

  return OasRef.create({
    fields,
    trail,
    context,
    skipped
  })
}

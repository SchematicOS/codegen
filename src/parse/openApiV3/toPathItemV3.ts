import type { OpenAPIV3 } from 'openapi-types'
import type { OasPathItemData } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toParameterListV3 } from './toParameterV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { PathItem } from 'parse/elements/PathItem.ts'

type ToPathItemV3Args = {
  pathItem: OpenAPIV3.PathItemObject
  trail: Trail
  context: ParseContext
}

export const toPathItemV3 = ({
  pathItem,
  trail,
  context
}: ToPathItemV3Args): OasPathItemData => {
  const { $ref, summary, description, parameters, ...skipped } = pathItem

  const fields = stripUndefined({
    $ref,
    summary,
    description,
    parameters: parameters
      ? toParameterListV3({
          parameters,
          trail: trail.add('parameters'),
          context
        })
      : undefined
  })

  return PathItem.create({ fields, trail, context, skipped })
}

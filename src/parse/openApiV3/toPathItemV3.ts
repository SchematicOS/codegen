import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toParameterListV3 } from './toParameterV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { OasPathItem } from 'parse/elements/PathItem.ts'
import type { PathItemFields } from 'parse/elements/PathItem.ts'

type ToPathItemV3Args = {
  pathItem: OpenAPIV3.PathItemObject
  trail: Trail
  context: ParseContext
}

export const toPathItemV3 = ({
  pathItem,
  trail,
  context
}: ToPathItemV3Args): OasPathItem => {
  const { summary, description, parameters, ...skipped } = pathItem

  const fields: PathItemFields = {
    summary,
    description,
    parameters: toParameterListV3({
      parameters,
      trail: trail.add('parameters'),
      context
    })
  }

  return OasPathItem.create({ fields, trail, context, skipped })
}

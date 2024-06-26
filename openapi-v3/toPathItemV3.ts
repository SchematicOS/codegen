import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from '../context/CoreContext.ts'
import { toParameterListV3 } from './toParameterV3.ts'
import type { Trail } from '../context/Trail.ts'
import { OasPathItem } from '../oas-elements/PathItem.ts'
import type { PathItemFields } from '../oas-elements/PathItem.ts'

type ToPathItemV3Args = {
  pathItem: OpenAPIV3.PathItemObject
  trail: Trail
  context: CoreContext
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

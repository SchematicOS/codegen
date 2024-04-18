import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import type { Trail } from 'core/lib/Trail.ts'

type ToAdditionalPropertiesV3Args = {
  additionalProperties:
    | boolean
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.SchemaObject
    | undefined
  trail: Trail
  context: CoreContext
}

export const toAdditionalPropertiesV3 = ({
  additionalProperties,
  trail,
  context
}: ToAdditionalPropertiesV3Args) => {
  if (typeof additionalProperties === 'boolean') {
    return additionalProperties
  }

  if (additionalProperties === undefined) {
    return undefined
  }

  return toSchemaV3({
    schema: additionalProperties,
    trail,
    context
  })
}

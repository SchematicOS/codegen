import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContextType } from '../lib/types.ts'
import { toSchemaV3 } from './toSchemasV3.ts'

export const toAdditionalPropertiesV3 = (
  additionalProperties:
    | boolean
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.SchemaObject
    | undefined,
  ctx: ParseContextType
) => {
  if (typeof additionalProperties === 'boolean') {
    return additionalProperties
  }

  if (additionalProperties === undefined) {
    return undefined
  }

  const parsed = toSchemaV3(additionalProperties, ctx)

  return parsed
}

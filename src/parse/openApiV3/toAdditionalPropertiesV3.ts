import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContextType } from '../lib/types.ts'
import { toSchemaV3 } from './toSchemasV3.ts'

type ToAdditionalPropertiesV3Args = {
  additionalProperties:
    | boolean
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.SchemaObject
    | undefined
  path: string[]
  context: ParseContextType
}

export const toAdditionalPropertiesV3 = ({
  additionalProperties,
  path,
  context
}: ToAdditionalPropertiesV3Args) => {
  if (typeof additionalProperties === 'boolean') {
    return additionalProperties
  }

  if (additionalProperties === undefined) {
    return undefined
  }

  const parsed = toSchemaV3({
    schema: additionalProperties,
    path: path.concat('additionalProperties'),
    context
  })

  return parsed
}

import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import type {
  OasParameter,
  OasParameterLocation,
  OasParameterRef
} from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { toExamplesV3 } from './toExamplesV3.ts'
import { toContentV3 } from './toContentV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toSchemaV3 } from './toSchemasV3.ts'

const isLocationV3 = (location: string): location is OasParameterLocation => {
  return ['query', 'header', 'path', 'cookie'].includes(location)
}

export const toParameterListV3 = (
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  context: ParseContextType
): (OasParameter | OasParameterRef)[] => {
  return parameters.map(parameter => toParameterV3(parameter, context))
}

export const toParametersV3 = (
  parameters: Record<
    string,
    OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  >,
  context: ParseContextType
): Record<string, OasParameter | OasParameterRef> => {
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => {
      return [key, toParameterV3(value, context)]
    })
  )
}

type ToParameterV3Args = {
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  path: string[]
  context: ParseContextType
}

const toParameterV3 = ({
  parameter,
  path,
  context
}: ToParameterV3Args): OasParameter | OasParameterRef => {
  if (isRef(parameter)) {
    return toRefV31(parameter, 'parameter', context)
  }

  const {
    name,
    in: location,
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema,
    example,
    examples,
    content,
    ...skipped
  } = parameter

  context.notImplemented({ section: 'OPENAPI_V3_PARAMETER', skipped })

  if (!isLocationV3(location)) {
    throw new Error(`Invalid location: ${location}`)
  }

  return {
    schematicType: 'parameter',
    name,
    location,
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema: schema
      ? toSchemaV3({ schema, path: path.concat('schema'), context })
      : undefined,
    examples: toExamplesV3(
      {
        examples,
        example,
        exampleKey: `${name}-${location}`
      },
      context
    ),
    content: content
      ? toContentV3({ content, path: path.concat('content'), context })
      : undefined
  }
}

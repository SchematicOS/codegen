import { ParseContextType } from '@/types.ts'
import { isRef } from '@/util/isRef.ts'
import {
  OasParameter,
  OasParameterLocation,
  OasParameterRef
} from '@schematicos/types'
import { OpenAPIV3 } from 'openapi-types'
import {
  toContentV3,
  toExamplesV3,
  toRefV31
} from '@/openApiV3/parseOpenApiV3.ts'
import { toSchemaV3 } from '@/openApiV3/toSchemaV3.ts'

const isLocationV3 = (location: string): location is OasParameterLocation => {
  return ['query', 'header', 'path', 'cookie'].includes(location)
}

export const toParameterListV3 = (
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  ctx: ParseContextType
) => {
  return parameters.map(parameter => toParameterV3(parameter, ctx))
}

export const toParametersV3 = (
  parameters: Record<
    string,
    OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  >,
  ctx: ParseContextType
): Record<string, OasParameter | OasParameterRef> => {
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => {
      return [key, toParameterV3(value, ctx)]
    })
  )
}

const toParameterV3 = (
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
  ctx: ParseContextType
): OasParameter | OasParameterRef => {
  if (isRef(parameter)) {
    return toRefV31(parameter, 'parameter', ctx)
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

  ctx.notImplemented({ section: 'OPENAPI_V3_PARAMETER', skipped })

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
    schema: schema ? toSchemaV3(schema, ctx) : undefined,
    examples: toExamplesV3(
      {
        examples,
        example,
        exampleKey: `${name}-${location}`
      },
      ctx
    ),
    content: content ? toContentV3(content, ctx) : undefined
  }
}

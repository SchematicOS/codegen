import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type {
  OasParameterData,
  OasParameterLocation,
  OasParameterRefData
} from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { toExamplesV3 } from './toExamplesV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { toMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Parameter } from 'parse/elements/Parameter.ts'

const isLocationV3 = (location: string): location is OasParameterLocation => {
  return ['query', 'header', 'path', 'cookie'].includes(location)
}

type ToParameterListV3Args = {
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
  trail: Trail
  context: ParseContext
}

export const toParameterListV3 = ({
  parameters,
  trail,
  context
}: ToParameterListV3Args): (OasParameterData | OasParameterRefData)[] => {
  return parameters.map((parameter, index) =>
    toParameterV3({ parameter, trail: trail.add(`[${index}]`), context })
  )
}

type ToParametersV3Args = {
  parameters: Record<
    string,
    OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  >
  trail: Trail
  context: ParseContext
}

export const toParametersV3 = ({
  parameters,
  trail,
  context
}: ToParametersV3Args): Record<
  string,
  OasParameterData | OasParameterRefData
> => {
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => {
      return [
        key,
        toParameterV3({ parameter: value, trail: trail.add(key), context })
      ]
    })
  )
}

type ToParameterV3Args = {
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  trail: Trail
  context: ParseContext
}

const toParameterV3 = ({
  parameter,
  trail,
  context
}: ToParameterV3Args): OasParameterData | OasParameterRefData => {
  if (isRef(parameter)) {
    return toRefV31({ ref: parameter, refType: 'parameter', trail, context })
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

  if (!isLocationV3(location)) {
    throw new Error(`Invalid location: ${location}`)
  }

  const fields = stripUndefined({
    name,
    location,
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema: schema
      ? toSchemaV3({ schema, trail: trail.add('schema'), context })
      : undefined,
    examples: toExamplesV3({
      examples,
      example,
      exampleKey: `${name}-${location}`,
      trail: trail.add('examples'),
      context
    }),
    content: content
      ? toMediaTypeItemsV3({ content, trail: trail.add('content'), context })
      : undefined
  })

  return Parameter.create({ fields, trail, skipped, context })
}

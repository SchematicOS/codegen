import type { ParseContext } from 'core/lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type { OasParameterLocation } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { toExamplesV3 } from './toExamplesV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toOptionalSchemaV3 } from './toSchemasV3.ts'
import type { Trail } from 'core/lib/Trail.ts'
import { toOptionalMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { OasParameter } from 'parse/elements/Parameter.ts'
import type { ParameterFields } from 'parse/elements/Parameter.ts'
import type { OasRef } from 'parse/elements/Ref.ts'

const isLocationV3 = (location: string): location is OasParameterLocation => {
  return ['query', 'header', 'path', 'cookie'].includes(location)
}

type ToParameterListV3Args = {
  parameters:
    | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
    | undefined
  trail: Trail
  context: ParseContext
}

export const toParameterListV3 = ({
  parameters,
  trail,
  context
}: ToParameterListV3Args):
  | (OasParameter | OasRef<'parameter'>)[]
  | undefined => {
  if (!parameters) {
    return undefined
  }

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
}: ToParametersV3Args): Record<string, OasParameter | OasRef<'parameter'>> => {
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => {
      return [
        key,
        toParameterV3({ parameter: value, trail: trail.add(key), context })
      ]
    })
  )
}

type ToOptionalParametersV3Args = {
  parameters:
    | Record<string, OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject>
    | undefined
  trail: Trail
  context: ParseContext
}

export const toOptionalParametersV3 = ({
  parameters,
  trail,
  context
}: ToOptionalParametersV3Args):
  | Record<string, OasParameter | OasRef<'parameter'>>
  | undefined => {
  if (!parameters) {
    return undefined
  }

  return toParametersV3({ parameters, trail, context })
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
}: ToParameterV3Args): OasParameter | OasRef<'parameter'> => {
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

  const fields: ParameterFields = {
    name,
    location,
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema: toOptionalSchemaV3({ schema, trail: trail.add('schema'), context }),
    examples: toExamplesV3({
      examples,
      example,
      exampleKey: `${name}-${location}`,
      trail: trail.add('examples'),
      context
    }),
    content: toOptionalMediaTypeItemsV3({
      content,
      trail: trail.add('content'),
      context
    })
  }

  return OasParameter.create({ fields, trail, skipped, context })
}

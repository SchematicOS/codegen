import { toExamplesV3 } from './toExamplesV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type { OasHeaderData, OasHeaderRefData } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import type { Trail } from 'parse/lib/Trail.ts'
import { toMediaTypeItemsV3 } from 'parse/openApiV3/toMediaTypeItemV3.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Header } from 'parse/elements/Header.ts'

type ToHeadersV3Args = {
  headers: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject>
  trail: Trail
  context: ParseContext
}

export const toHeadersV3 = ({
  headers,
  trail,
  context
}: ToHeadersV3Args): Record<string, OasHeaderData | OasHeaderRefData> => {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => {
      return [
        key,
        toHeaderV3({ header: value, trail: trail.add(key), context })
      ]
    })
  )
}

type ToHeaderV3Args = {
  header: OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject
  trail: Trail
  context: ParseContext
}

const toHeaderV3 = ({
  header,
  trail,
  context
}: ToHeaderV3Args): OasHeaderRefData | OasHeaderData => {
  if (isRef(header)) {
    return toRefV31({ ref: header, refType: 'header', trail, context })
  }

  const {
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema,
    example,
    examples,
    content,
    ...skipped
  } = header

  const fields = stripUndefined({
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
      exampleKey: `TEMP`,
      trail,
      context
    }),
    content: content
      ? toMediaTypeItemsV3({ content, trail: trail.add('content'), context })
      : undefined
  })

  return Header.create({ fields, trail, skipped, context })
}

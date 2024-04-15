import { toExamplesV3 } from './toExamplesV3.ts'
import { toContentV3 } from './toContentV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import type { OasHeader, OasHeaderRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'

export const toHeadersV3 = (
  headers: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject>,
  ctx: ParseContextType
): Record<string, OasHeader | OasHeaderRef> => {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => {
      return [key, toHeaderV3(value, ctx)]
    })
  )
}

const toHeaderV3 = (
  header: OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject,
  ctx: ParseContextType
): OasHeaderRef | OasHeader => {
  if (isRef(header)) {
    return toRefV31(header, 'header', ctx)
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

  ctx.notImplemented({ section: 'OPENAPI_V3_HEADER', skipped })

  return {
    schematicType: 'header',
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema: schema ? toSchemaV3(schema, ctx) : undefined,
    examples: toExamplesV3({ examples, example, exampleKey: `TEMP` }, ctx),
    content: content ? toContentV3(content, ctx) : undefined
  }
}

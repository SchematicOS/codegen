import { toExamplesV3 } from './toExamplesV3.ts'
import { toContentV3 } from './toContentV3.ts'
import { toRefV31 } from './toRefV31.ts'
import { toSchemaV3 } from './toSchemasV3.ts'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import type { OasHeader, OasHeaderRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'

type ToHeadersV3Args = {
  headers: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject>
  path: string[]
  context: ParseContextType
}

export const toHeadersV3 = ({
  headers,
  path,
  context
}: ToHeadersV3Args): Record<string, OasHeader | OasHeaderRef> => {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => {
      return [
        key,
        toHeaderV3({ header: value, path: path.concat(key), context })
      ]
    })
  )
}

type ToHeaderV3Args = {
  header: OpenAPIV3.ReferenceObject | OpenAPIV3.HeaderObject
  path: string[]
  context: ParseContextType
}

const toHeaderV3 = ({
  header,
  path,
  context
}: ToHeaderV3Args): OasHeaderRef | OasHeader => {
  if (isRef(header)) {
    return toRefV31(header, 'header', context)
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

  context.notImplemented({ section: 'OPENAPI_V3_HEADER', skipped })

  return {
    schematicType: 'header',
    description,
    required,
    deprecated,
    allowEmptyValue,
    schema: schema
      ? toSchemaV3({ schema, path: path.concat('schema'), context })
      : undefined,
    examples: toExamplesV3({ examples, example, exampleKey: `TEMP` }, context),
    content: content
      ? toContentV3({ content, path: path.concat('content'), context })
      : undefined
  }
}

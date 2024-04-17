import type {
  OasExampleRefData,
  OasHeaderRefData,
  OasParameterRefData,
  OasRefData,
  OasRequestBodyRefData,
  OasResponseRefData,
  OasSchemaRefData
} from '@schematicos/types'
import type { Trail } from 'parse/lib/Trail.ts'

export type ParsingSection =
  | 'PARSE_SCHEMA'
  | 'OPENAPI_V3_DOCUMENT'
  | 'OPENAPI_V3_INFO'
  | 'OPENAPI_V3_OPERATION'
  | 'OPENAPI_V3_COMPONENTS'
  | 'OPENAPI_V3_SCHEMA'
  | 'OPENAPI_V3_SCHEMA_OBJECT'
  | 'OPENAPI_V3_SCHEMA_ARRAY'
  | 'OPENAPI_V3_SCHEMA_INTEGER'
  | 'OPENAPI_V3_SCHEMA_NUMBER'
  | 'OPENAPI_V3_SCHEMA_BOOLEAN'
  | 'OPENAPI_V3_SCHEMA_STRING'
  | 'OPENAPI_V3_SCHEMA_REF'
  | 'OPENAPI_V3_PARAMETER'
  | 'OPENAPI_V3_RESPONSE'
  | 'OPENAPI_V3_HEADER'
  | 'OPENAPI_V3_REF'
  | 'OPENAPI_V3_REQUEST_BODY'
  | 'OPENAPI_V3_MEDIA_TYPE_ITEM'
  | 'OPENAPI_V3_EXAMPLE'
  | 'OPENAPI_V3_EXAMPLES'
  | 'OPENAPI_V3_PATH_ITEM'
  | 'OPENAPI_V3_TAG'
  | 'OPENAPI_V3_DISCRIMINATOR'

export type NotImplementedArgs =
  | {
      trail: Trail
      skipped: Record<string, unknown>
    }
  | UnexpectedValueArgs

export type UnexpectedValueArgs = {
  trail: Trail
  message: string
}

export type RefReturn<T extends OasRefData['refType']> = T extends 'schema'
  ? OasSchemaRefData
  : T extends 'response'
  ? OasResponseRefData
  : T extends 'parameter'
  ? OasParameterRefData
  : T extends 'example'
  ? OasExampleRefData
  : T extends 'requestBody'
  ? OasRequestBodyRefData
  : T extends 'header'
  ? OasHeaderRefData
  : never

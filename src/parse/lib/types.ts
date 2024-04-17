import type {
  OasExampleRef,
  OasHeaderRef,
  OasParameterRef,
  OasRef,
  OasRequestBodyRef,
  OasResponseRef,
  OasSchemaRef
} from '@schematicos/types'

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
      section: ParsingSection
      skipped: Record<string, unknown>
    }
  | UnexpectedValueArgs

export type UnexpectedValueArgs = {
  section: ParsingSection
  message: string
}

export type RefReturn<T extends OasRef['refType']> = T extends 'schema'
  ? OasSchemaRef
  : T extends 'response'
  ? OasResponseRef
  : T extends 'parameter'
  ? OasParameterRef
  : T extends 'example'
  ? OasExampleRef
  : T extends 'requestBody'
  ? OasRequestBodyRef
  : T extends 'header'
  ? OasHeaderRef
  : never

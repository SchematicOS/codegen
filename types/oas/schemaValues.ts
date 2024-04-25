import {
  type OasDiscriminatorData,
  oasDiscriminatorData
} from './discriminator.ts'
import { type OasSchemaRefData, oasSchemaRefData } from './ref.ts'
import { z } from 'zod'

export const oasArrayData: z.ZodType<OasArrayData> = z.object({
  schematicType: z.literal('schema'),
  // Add soon
  type: z.literal('array'),
  // additionalItems: z.lazy(() => z.union([z.boolean(), jsonSchema4]).optional()),
  items: z.lazy(() => z.union([oasSchemaData, oasSchemaRefData])),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.array(z.unknown()).optional()

  // Add soon
  // maxItems: z.number().optional(),
  // minItems: z.number().optional(),
  // uniqueItems: z.boolean().optional()
})

export type OasArrayData = {
  schematicType: 'schema'
  type: 'array'
  items: OasSchemaData | OasSchemaRefData
  title?: string
  description?: string
  default?: unknown[]
}

export const oasBooleanData: z.ZodType<OasBooleanData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.boolean().optional(),
  type: z.literal('boolean')
})

export type OasBooleanData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: boolean
  type: 'boolean'
}

export const oasNullData: z.ZodType<OasNullData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.null().optional(),
  type: z.literal('null')
})

export type OasNullData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: null
  type: 'null'
}

export const oasUnknownData: z.ZodType<OasUnknownData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.unknown().optional(),
  type: z.literal('unknown')
})

export type OasUnknownData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: unknown
  type: 'unknown'
}

export const oasIntegerData: z.ZodType<OasIntegerData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.number().int().optional(),
  type: z.literal('integer')
  // Add soon
  // multipleOf: z.number().optional(),
  // maximum: z.number().optional(),
  // exclusiveMaximum: z.boolean().optional(),
  // minimum: z.number().optional(),
  // exclusiveMinimum: z.boolean().optional()
})

export type OasIntegerData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: number
  type: 'integer'
}

export const oasNumberData: z.ZodType<OasNumberData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.number().optional(),
  type: z.literal('number')
  // Add soon
  // multipleOf: z.number().optional(),
  // maximum: z.number().optional(),
  // exclusiveMaximum: z.boolean().optional(),
  // minimum: z.number().optional(),
  // exclusiveMinimum: z.boolean().optional()
})

export type OasNumberData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: number
  type: 'number'
}

export const oasStringData: z.ZodType<OasStringData> = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.string().optional(),
  type: z.literal('string'),
  // Add soon
  // maxLength: z.number().optional(),
  // minLength: z.number().optional(),
  pattern: z.string().optional(),
  enums: z.array(z.string()).optional(),
  format: z
    .enum([
      'date-time',
      'time',
      'date',
      'duration',
      'email',
      'hostname',
      'ipv4',
      'ipv6',
      'uuid',
      'uri',
      'regex',
      'binary'
    ])
    .optional()
})

export type OasStringData = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: string
  type: 'string'
  pattern?: string
  enums?: string[]
  format?:
    | 'date-time'
    | 'time'
    | 'date'
    | 'duration'
    | 'email'
    | 'hostname'
    | 'ipv4'
    | 'ipv6'
    | 'uuid'
    | 'uri'
    | 'regex'
    | 'binary'
}

export type OasUnionData = {
  schematicType: 'schema'
  type: 'union'
  title?: string
  description?: string
  members: (OasSchemaData | OasSchemaRefData)[]
  discriminator?: OasDiscriminatorData
}

export const oasUnionData: z.ZodType<OasUnionData> = z.object({
  schematicType: z.literal('schema'),
  type: z.literal('union'),
  title: z.string().optional(),
  description: z.string().optional(),
  members: z.lazy(() => z.array(z.union([oasSchemaData, oasSchemaRefData]))),
  discriminator: oasDiscriminatorData.optional()
})

export type OasIntersectionData = {
  schematicType: 'schema'
  type: 'intersection'
  title?: string
  description?: string
  members: (OasSchemaData | OasSchemaRefData)[]
  discriminator?: OasDiscriminatorData
}

export const oasIntersectionData: z.ZodType<OasIntersectionData> = z.object({
  schematicType: z.literal('schema'),
  type: z.literal('intersection'),
  title: z.string().optional(),
  description: z.string().optional(),
  members: z.lazy(() => z.array(z.union([oasSchemaData, oasSchemaRefData]))),
  discriminator: oasDiscriminatorData.optional()
})

export const oasObjectData: z.ZodType<OasObjectData> = z.object({
  schematicType: z.literal('schema'),
  type: z.literal('object'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.object({}).optional(),
  // Add soon
  // maxProperties: z.number().optional(),
  // Add soon
  // minProperties: z.number().optional(),
  properties: z.lazy(() => {
    return z.record(z.union([oasSchemaData, oasSchemaRefData])).optional()
  }),
  // Add soon
  // patternProperties: z.lazy(() => z.record(jsonSchema4).optional()),
  required: z.array(z.string()).optional(),
  // allOf: z.lazy(() => z.array(oasObject).optional()),

  // Use oneOf instead of anyOf
  // anyOf: z.lazy(() => z.array(jsonSchema4).optional()),
  // oneOf: z.lazy(() => z.array(oasObject).optional()),
  additionalProperties: z.lazy(() => {
    return z.union([z.boolean(), oasSchemaData, oasSchemaRefData]).optional()
  })
})

export type OasObjectData = {
  schematicType: 'schema'
  type: 'object'
  title?: string
  description?: string
  default?: Record<string, unknown>
  properties?: Record<string, OasSchemaData | OasSchemaRefData>
  required?: string[]
  additionalProperties?: boolean | OasSchemaData | OasSchemaRefData
}

export type OasSchemaData =
  | OasArrayData
  | OasBooleanData
  | OasNullData
  | OasIntegerData
  | OasNumberData
  | OasStringData
  | OasObjectData
  | OasUnionData
  | OasIntersectionData
  | OasUnknownData

export const oasSchemaData: z.ZodType<OasSchemaData> = z.union([
  oasObjectData,
  oasArrayData,
  oasBooleanData,
  oasStringData,
  oasNumberData,
  oasNullData,
  oasIntegerData,
  oasUnionData,
  oasIntersectionData,
  oasUnknownData
])

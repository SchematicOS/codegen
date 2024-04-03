import { oasDiscriminator } from 'engine/discriminator/types.ts'
import { OasSchemaRef, oasSchemaRef } from 'engine/ref/types.ts'
import { z } from 'zod'

export const oasArray: z.ZodType<OasArray> = z.object({
  schematicType: z.literal('schema'),
  // Add soon
  type: z.literal('array'),
  // additionalItems: z.lazy(() => z.union([z.boolean(), jsonSchema4]).optional()),
  items: z.lazy(() => z.union([oasSchema, oasSchemaRef])),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.array(z.any()).optional()

  // Add soon
  // maxItems: z.number().optional(),
  // minItems: z.number().optional(),
  // uniqueItems: z.boolean().optional()
})

export type OasArray = {
  schematicType: 'schema'
  type: 'array'
  items: OasSchema | OasSchemaRef
  title?: string
  description?: string
  default?: any[]
}

export const oasBoolean = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.boolean().optional(),
  type: z.literal('boolean')
})

export type OasBoolean = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: boolean
  type: 'boolean'
}

export const oasNull = z.object({
  schematicType: z.literal('schema'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.null().optional(),
  type: z.literal('null')
})

export type OasNull = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: null
  type: 'null'
}

export const oasInteger = z.object({
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

export type OasInteger = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: number
  type: 'integer'
}

export const oasNumber = z.object({
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

export type OasNumber = {
  schematicType: 'schema'
  title?: string
  description?: string
  default?: number
  type: 'number'
}

export const oasString = z.object({
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

export type OasString = {
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

export const oasObject: z.ZodType<OasObject> = z.object({
  schematicType: z.literal('schema'),
  type: z.literal('object'),
  title: z.string().optional(),
  description: z.string().optional(),
  default: z.object({}).optional(),
  // Add soon
  // maxProperties: z.number().optional(),
  // Add soon
  // minProperties: z.number().optional(),
  discriminator: oasDiscriminator.optional(),
  properties: z.lazy(() => {
    return z.record(z.union([oasSchema, oasSchemaRef])).optional()
  }),
  // Add soon
  // patternProperties: z.lazy(() => z.record(jsonSchema4).optional()),
  required: z.array(z.string()).optional(),
  allOf: z.lazy(() => z.array(oasObject).optional()),

  // Use oneOf instead of anyOf
  // anyOf: z.lazy(() => z.array(jsonSchema4).optional()),
  oneOf: z.lazy(() => z.array(oasObject).optional()),
  additionalProperties: z.lazy(() => {
    return z
      .union([z.boolean(), oasSchema, oasSchemaRef, z.record(z.never())])
      .optional()
  })
})

export type OasObject = {
  schematicType: 'schema'
  type: 'object'
  title?: string
  description?: string
  default?: Record<string, unknown>
  properties?: Record<string, OasSchema | OasSchemaRef>
  required?: string[]
  allOf?: OasSchema[]
  oneOf?: OasSchema[]
  additionalProperties?:
    | boolean
    | OasSchema
    | OasSchemaRef
    | Record<string, never>
}

export type OasSchema =
  | OasArray
  | OasBoolean
  | OasNull
  | OasInteger
  | OasNumber
  | OasString
  | OasObject

export const oasSchema: z.ZodType<OasSchema> = z.union([
  oasObject,
  oasArray,
  oasBoolean,
  oasString,
  oasNumber,
  oasNull,
  oasInteger
])

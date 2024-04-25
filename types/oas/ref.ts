import { markdown } from './markdown.ts'
import { z } from 'zod'

export type OasSchemaRefData = {
  schematicType: 'ref'
  refType: 'schema'
  $ref: string
  summary?: string
  description?: string
}

export const oasSchemaRefData: z.ZodType<OasSchemaRefData> = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['schema']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasResponseRefData = {
  schematicType: 'ref'
  refType: 'response'
  $ref: string
  summary?: string
  description?: string
}

export const oasResponseRefData: z.ZodType<OasResponseRefData> = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['response']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasParameterRefData = {
  schematicType: 'ref'
  refType: 'parameter'
  $ref: string
  summary?: string
  description?: string
}

export const oasParameterRefData: z.ZodType<OasParameterRefData> = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['parameter']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasExampleRefData = {
  schematicType: 'ref'
  refType: 'example'
  $ref: string
  summary?: string
  description?: string
}

export const oasExampleRefData: z.ZodType<OasExampleRefData> = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['example']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasRequestBodyRefData = {
  schematicType: 'ref'
  refType: 'requestBody'
  $ref: string
  summary?: string
  description?: string
}

export const oasRequestBodyRefData: z.ZodType<OasRequestBodyRefData> = z.object(
  {
    schematicType: z.literal('ref'),
    refType: z.enum(['requestBody']),
    $ref: z.string(),
    summary: z.string().optional(),
    description: markdown.optional()
  }
)
export type OasHeaderRefData = {
  schematicType: 'ref'
  refType: 'header'
  $ref: string
  summary?: string
  description?: string
}

export const oasHeaderRefData: z.ZodType<OasHeaderRefData> = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['header']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

// export const oasPathItemRefData = z.object({
//   schematicType: z.literal('ref'),
//   refType: z.enum(['pathItem']),
//   $ref: z.string(),
//   summary: z.string().optional(),
//   description: markdown.optional()
// })

export type OasRefData =
  | OasSchemaRefData
  | OasResponseRefData
  | OasParameterRefData
  | OasExampleRefData
  | OasRequestBodyRefData
  | OasHeaderRefData
// OasPathItemRefData

export const oasRefData: z.ZodType<OasRefData> = z.union([
  oasSchemaRefData,
  oasResponseRefData,
  oasParameterRefData,
  oasExampleRefData,
  oasRequestBodyRefData,
  oasHeaderRefData
  // oasPathItemRefData
])

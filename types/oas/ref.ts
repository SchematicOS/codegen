import { markdown } from './markdown.ts'
import { z } from 'npm:zod'

export const oasSchemaRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['schema']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasSchemaRefData = z.infer<typeof oasSchemaRefData>

export const oasResponseRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['response']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasResponseRefData = z.infer<typeof oasResponseRefData>

export const oasParameterRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['parameter']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasParameterRefData = z.infer<typeof oasParameterRefData>

export const oasExampleRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['example']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasExampleRefData = z.infer<typeof oasExampleRefData>

export const oasRequestBodyRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['requestBody']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasRequestBodyRefData = z.infer<typeof oasRequestBodyRefData>

export const oasHeaderRefData = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['header']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasHeaderRefData = z.infer<typeof oasHeaderRefData>

// export const oasPathItemRefData = z.object({
//   schematicType: z.literal('ref'),
//   refType: z.enum(['pathItem']),
//   $ref: z.string(),
//   summary: z.string().optional(),
//   description: markdown.optional()
// })

// export type OasPathItemRef = z.infer<typeof oasPathItemRefData>

export const oasRefData = z.union([
  oasSchemaRefData,
  oasResponseRefData,
  oasParameterRefData,
  oasExampleRefData,
  oasRequestBodyRefData,
  oasHeaderRefData
  // oasPathItemRefData
])

export type OasRefData = z.infer<typeof oasRefData>

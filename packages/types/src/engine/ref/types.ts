import { markdown } from 'engine/markdown/types.ts'
import { z } from 'zod'

export const oasSchemaRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['schema']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasSchemaRef = z.infer<typeof oasSchemaRef>

export const oasResponseRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['response']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasResponseRef = z.infer<typeof oasResponseRef>

export const oasParameterRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['parameter']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasParameterRef = z.infer<typeof oasParameterRef>

export const oasExampleRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['example']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasExampleRef = z.infer<typeof oasExampleRef>

export const oasRequestBodyRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['requestBody']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasRequestBodyRef = z.infer<typeof oasRequestBodyRef>

export const oasHeaderRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['header']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasHeaderRef = z.infer<typeof oasHeaderRef>

export const oasPathItemRef = z.object({
  schematicType: z.literal('ref'),
  refType: z.enum(['pathItem']),
  $ref: z.string(),
  summary: z.string().optional(),
  description: markdown.optional()
})

export type OasPathItemRef = z.infer<typeof oasPathItemRef>

export const oasRef = z.union([
  oasSchemaRef,
  oasResponseRef,
  oasParameterRef,
  oasExampleRef,
  oasRequestBodyRef,
  oasHeaderRef,
  oasPathItemRef
])

export type OasRef = z.infer<typeof oasRef>

import { markdown } from 'engine/markdown/types.ts'
import { oasParameter } from 'engine/parameter/types.ts'
import { oasParameterRef } from 'engine/ref/types.ts'
import { z } from 'zod'

export const oasPathItem = z.object({
  schematicType: z.literal('pathItem'),
  $ref: z.string().optional(),
  summary: z.string().optional(),
  description: markdown.optional(),
  // servers: z.array(server).optional(),
  parameters: z.array(z.union([oasParameter, oasParameterRef])).optional()
})

export type OasPathItem = z.infer<typeof oasPathItem>

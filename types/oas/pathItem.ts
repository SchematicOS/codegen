import { markdown } from './markdown.ts'
import { oasParameterData } from './parameter.ts'
import { oasParameterRefData } from './ref.ts'
import { z } from 'zod'

export const oasPathItemData = z.object({
  schematicType: z.literal('pathItem'),
  $ref: z.string().optional(),
  summary: z.string().optional(),
  description: markdown.optional(),
  // servers: z.array(server).optional(),
  parameters: z
    .array(z.union([oasParameterData, oasParameterRefData]))
    .optional()
})

export type OasPathItemData = z.infer<typeof oasPathItemData>

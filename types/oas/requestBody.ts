import { markdown } from './markdown.ts'
import { oasMediaTypeData } from './mediaItem.ts'
import { z } from 'zod'

export const oasRequestBodyData = z.object({
  schematicType: z.literal('requestBody'),
  description: markdown.optional(),
  content: z.record(oasMediaTypeData),
  required: z.boolean().optional()
})

export type OasRequestBodyData = z.infer<typeof oasRequestBodyData>

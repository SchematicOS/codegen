import { markdown } from 'engine/markdown/types.ts'
import { oasMediaTypeItem } from 'engine/mediaItem/types.ts'
import { z } from 'zod'

export const oasRequestBody = z.object({
  schematicType: z.literal('requestBody'),
  description: markdown.optional(),
  content: z.record(oasMediaTypeItem),
  required: z.boolean().optional()
})

export type OasRequestBody = z.infer<typeof oasRequestBody>

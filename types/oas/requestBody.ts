import { markdown } from './markdown.ts'
import { type OasMediaTypeData, oasMediaTypeData } from './mediaItem.ts'
import { z } from 'zod'

export type OasRequestBodyData = {
  schematicType: 'requestBody'
  description?: string
  content: Record<string, OasMediaTypeData>
  required?: boolean
}

export const oasRequestBodyData: z.ZodType<OasRequestBodyData> = z.object({
  schematicType: z.literal('requestBody'),
  description: markdown.optional(),
  content: z.record(oasMediaTypeData),
  required: z.boolean().optional()
})

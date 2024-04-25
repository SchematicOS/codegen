import { markdown } from './markdown.ts'
import { z } from 'zod'

export type OasExampleData = {
  schematicType: 'example'
  summary?: string
  description?: string
  value?: unknown
  // externalValue?: string
}

export const oasExampleData: z.ZodType<OasExampleData> = z.object({
  schematicType: z.literal('example'),
  summary: z.string().optional(),
  description: markdown.optional(),
  value: z.unknown().optional()
  // externalValue: url.optional()
})

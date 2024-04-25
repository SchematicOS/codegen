import { markdown } from './markdown.ts'
import { z } from 'zod'

export const oasExampleData = z.object({
  schematicType: z.literal('example'),
  summary: z.string().optional(),
  description: markdown.optional(),
  value: z.any().optional()
  // externalValue: url.optional()
})

export type OasExampleData = z.infer<typeof oasExampleData>

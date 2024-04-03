import { markdown } from 'engine/markdown/types.ts'
import { z } from 'zod'

export const oasExample = z.object({
  schematicType: z.literal('example'),
  summary: z.string().optional(),
  description: markdown.optional(),
  value: z.any().optional()
  // externalValue: url.optional()
})

export type OasExample = z.infer<typeof oasExample>

import { z } from 'zod'

export const parsePayload = z.object({
  schemaDocument: z.string(),
  schemaFormat: z.enum(['json', 'yaml'])
})

export type ParsePayload = z.infer<typeof parsePayload>

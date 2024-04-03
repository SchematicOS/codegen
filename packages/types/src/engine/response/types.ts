import { oasHeader } from 'engine/header/types.ts'
import { oasMediaTypeItem } from 'engine/mediaItem/types.ts'
import { oasHeaderRef } from 'engine/ref/types.ts'
import { z } from 'zod'

export const oasResponse = z.object({
  schematicType: z.literal('response'),
  description: z.string(),
  headers: z.record(z.union([oasHeader, oasHeaderRef])).optional(),
  content: z.record(oasMediaTypeItem).optional()
  // links: z.record(z.union([link, ref])).optional()
})

export type OasResponse = z.infer<typeof oasResponse>

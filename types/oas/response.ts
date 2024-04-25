import { oasHeaderData } from './header.ts'
import { oasMediaTypeData } from './mediaItem.ts'
import { oasHeaderRefData } from './ref.ts'
import { z } from 'npm:zod'

export const oasResponseData = z.object({
  schematicType: z.literal('response'),
  description: z.string(),
  headers: z.record(z.union([oasHeaderData, oasHeaderRefData])).optional(),
  content: z.record(oasMediaTypeData).optional()
  // links: z.record(z.union([link, ref])).optional()
})

export type OasResponseData = z.infer<typeof oasResponseData>

import { type OasHeaderData, oasHeaderData } from './header.ts'
import { type OasMediaTypeData, oasMediaTypeData } from './mediaItem.ts'
import { type OasHeaderRefData, oasHeaderRefData } from './ref.ts'
import { z } from 'zod'

export type OasResponseData = {
  schematicType: 'response'
  description: string
  headers?: Record<string, OasHeaderData | OasHeaderRefData>
  content?: Record<string, OasMediaTypeData>
  // links?: Record<string, Link | Ref>
}

export const oasResponseData: z.ZodType<OasResponseData> = z.object({
  schematicType: z.literal('response'),
  description: z.string(),
  headers: z.record(z.union([oasHeaderData, oasHeaderRefData])).optional(),
  content: z.record(oasMediaTypeData).optional()
  // links: z.record(z.union([link, ref])).optional()
})

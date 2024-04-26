import { markdown } from './markdown.ts'
import { type OasParameterData, oasParameterData } from './parameter.ts'
import { type OasParameterRefData, oasParameterRefData } from './ref.ts'
import { z } from 'zod'

export type OasPathItemData = {
  schematicType: 'pathItem'
  $ref?: string
  summary?: string
  description?: string
  // servers?: OasServerData[]
  parameters?: (OasParameterData | OasParameterRefData)[]
}

export const oasPathItemData: z.ZodType<OasPathItemData> = z.object({
  schematicType: z.literal('pathItem'),
  $ref: z.string().optional(),
  summary: z.string().optional(),
  description: markdown.optional(),
  // servers: z.array(server).optional(),
  parameters: z
    .array(z.union([oasParameterData, oasParameterRefData]))
    .optional()
})

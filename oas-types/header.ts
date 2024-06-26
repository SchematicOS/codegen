import { type OasExampleData, oasExampleData } from './example.ts'
import { markdown } from './markdown.ts'
import { type OasMediaTypeData, oasMediaTypeData } from './mediaItem.ts'
import {
  type OasExampleRefData,
  type OasSchemaRefData,
  oasExampleRefData,
  oasSchemaRefData
} from './ref.ts'
import { type OasSchemaData, oasSchemaData } from './schemaValues.ts'
import { z } from 'zod'

export type OasHeaderData = {
  schematicType: 'header'
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  schema?: OasSchemaData | OasSchemaRefData
  examples?: Record<string, OasExampleData | OasExampleRefData>
  content?: Record<string, OasMediaTypeData>
}

export const oasHeaderData: z.ZodType<OasHeaderData> = z.object({
  schematicType: z.literal('header'),
  description: markdown.optional(),
  required: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  allowEmptyValue: z.boolean().optional(),
  // Default values (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
  // style: z.string().optional(),
  // explode: z.boolean().optional(),
  // allowReserved: z.boolean().optional(),
  schema: z.union([oasSchemaData, oasSchemaRefData]).optional(),
  // example: z.any().optional(),
  examples: z.record(z.union([oasExampleData, oasExampleRefData])).optional(),
  content: z.record(oasMediaTypeData).optional()
})

// export type OasHeaders = Record<string, OasHeader | OasHeaderRef>

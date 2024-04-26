import { type OasExampleData, oasExampleData } from './example.ts'
import {
  type OasExampleRefData,
  type OasSchemaRefData,
  oasExampleRefData,
  oasSchemaRefData
} from './ref.ts'
import { type OasSchemaData, oasSchemaData } from './schemaValues.ts'
import { z } from 'zod'

export type OasMediaTypeData = {
  schematicType: 'mediaType'
  mediaType: string
  schema?: OasSchemaData | OasSchemaRefData
  // example?: unknown
  examples?: Record<string, OasExampleData | OasExampleRefData>
  // encoding?: Record<string, OasEncodingData>
}

export const oasMediaTypeData: z.ZodType<OasMediaTypeData> = z.object({
  schematicType: z.literal('mediaType'),
  mediaType: z.string(),
  schema: z.union([oasSchemaData, oasSchemaRefData]).optional(),
  // example: z.any().optional(),
  examples: z.record(z.union([oasExampleData, oasExampleRefData])).optional()
  // encoding: z.lazy(() => z.record(encoding).optional())
})

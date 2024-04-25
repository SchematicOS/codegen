import { oasExampleData } from './example.ts'
import { oasExampleRefData, oasSchemaRefData } from './ref.ts'
import { oasSchemaData } from './schemaValues.ts'
import { z } from 'npm:zod'

export const oasMediaTypeData = z.object({
  schematicType: z.literal('mediaType'),
  mediaType: z.string(),
  schema: z.union([oasSchemaData, oasSchemaRefData]).optional(),
  // example: z.any().optional(),
  examples: z.record(z.union([oasExampleData, oasExampleRefData])).optional()
  // encoding: z.lazy(() => z.record(encoding).optional())
})

export type OasMediaTypeData = z.infer<typeof oasMediaTypeData>

import { oasExample } from 'engine/example/types.ts'
import { oasExampleRef, oasSchemaRef } from 'engine/ref/types.ts'
import { oasSchema } from 'engine/schemaValues.ts'
import { z } from 'zod'

export const oasMediaTypeItem = z.object({
  schematicType: z.literal('mediaType'),
  mediaType: z.string(),
  schema: z.union([oasSchema, oasSchemaRef]).optional(),
  // example: z.any().optional(),
  examples: z.record(z.union([oasExample, oasExampleRef])).optional()
  // encoding: z.lazy(() => z.record(encoding).optional())
})

export type OasMediaTypeItem = z.infer<typeof oasMediaTypeItem>

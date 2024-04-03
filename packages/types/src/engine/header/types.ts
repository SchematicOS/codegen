import { oasExample } from 'engine/example/types.ts'
import { markdown } from 'engine/markdown/types.ts'
import { oasMediaTypeItem } from 'engine/mediaItem/types.ts'
import { oasExampleRef, oasSchemaRef } from 'engine/ref/types.ts'
import { oasSchema } from 'engine/schemaValues.ts'
import { z } from 'zod'

export const oasHeader = z.object({
  schematicType: z.literal('header'),
  description: markdown.optional(),
  required: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  allowEmptyValue: z.boolean().optional(),
  // Default values (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
  // style: z.string().optional(),
  // explode: z.boolean().optional(),
  // allowReserved: z.boolean().optional(),
  schema: z.union([oasSchema, oasSchemaRef]).optional(),
  // example: z.any().optional(),
  examples: z.record(z.union([oasExample, oasExampleRef])).optional(),
  content: z.record(oasMediaTypeItem).optional()
})

export type OasHeader = z.infer<typeof oasHeader>

// export type OasHeaders = Record<string, OasHeader | OasHeaderRef>

import { oasExampleData } from './example.ts'
import { markdown } from './markdown.ts'
import { oasMediaTypeData } from './mediaItem.ts'
import { oasParameterLocation } from './parameterLocation.ts'
import { oasExampleRefData, oasSchemaRefData } from './ref.ts'
import { oasSchemaData } from './schemaValues.ts'
import { z } from 'npm:zod'

export const oasParameterData = z.object({
  schematicType: z.literal('parameter'),
  name: z.string(),
  location: oasParameterLocation,
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

export type OasParameterData = z.infer<typeof oasParameterData>

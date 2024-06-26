import { z } from 'zod'

// Not an actual OAS type, but adding it here to
// transform to a void type during transform
export const oasVoidData: z.ZodType<OasVoidData> = z.object({
  schematicType: z.literal('schema'),
  description: z.string().optional(),
  type: z.literal('void')
})

export type OasVoidData = {
  schematicType: 'schema'
  description?: string
  type: 'void'
}

import { z } from 'zod'

// Not an actual OAS type, but adding it here to
// transform to a void type during transform
export const oasVoid = z.object({
  schematicType: z.literal('schema'),
  description: z.string().optional(),
  type: z.literal('void')
})

export type OasVoid = {
  schematicType: 'schema'
  description?: string
  type: 'void'
}

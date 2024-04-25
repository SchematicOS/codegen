import { z } from 'npm:zod'

export const oasDiscriminatorData = z.object({
  schematicType: z.literal('discriminator'),
  propertyName: z.string(),
  mapping: z.record(z.string()).optional()
})

export type OasDiscriminatorData = z.infer<typeof oasDiscriminatorData>

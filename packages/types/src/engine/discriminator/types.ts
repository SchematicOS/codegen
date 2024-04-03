import { z } from 'zod'

export const oasDiscriminator = z.object({
  schematicType: z.literal('discriminator'),
  propertyName: z.string(),
  mapping: z.record(z.string()).optional()
})

export type OasDiscriminator = z.infer<typeof oasDiscriminator>

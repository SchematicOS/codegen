import { z } from 'zod'

export type OasDiscriminatorData = {
  schematicType: 'discriminator'
  propertyName: string
  mapping?: Record<string, string>
}

export const oasDiscriminatorData: z.ZodType<OasDiscriminatorData> = z.object({
  schematicType: z.literal('discriminator'),
  propertyName: z.string(),
  mapping: z.record(z.string()).optional()
})

import { transformerType } from 'models/transformer/types.ts'
import { z } from 'zod'

export const manifestType = z.object({
  id: z.string(),
  name: z.string(),
  type: transformerType
})

export type ManifestType = z.infer<typeof manifestType>

export const manifestList = z.object({ transformers: z.array(manifestType) })

export type ManifestList = z.infer<typeof manifestList>

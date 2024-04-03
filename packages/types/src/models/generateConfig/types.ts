import { z } from 'zod'

export const generateConfigType = z.object({
  language: z.enum(['typescript']),
  transformerIds: z.array(z.string()),
  typeSystemId: z.string().optional()
})

export type GenerateConfigType = {
  language: 'typescript'
  transformerIds: string[]
  typeSystemId?: string
}

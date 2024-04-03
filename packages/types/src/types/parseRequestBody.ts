import { z } from 'zod'

export const parseRequestBody = z.object({
  document: z.string()
})

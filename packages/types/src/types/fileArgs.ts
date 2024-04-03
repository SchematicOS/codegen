import { z } from 'zod'

export const fileArgs = z.object({
  directory: z.string(),
  exportPath: z.string(),
  destination: z.string()
})

export type FileArgs = z.infer<typeof fileArgs>

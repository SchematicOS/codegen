import { z } from 'zod'

export const exportType = z.enum(['github', 'zip'])

export type ExportType = 'github' | 'zip'

export const exportConfigType = z.object({
  type: exportType.nullable(),
  repo: z.string().optional(),
  title: z.string().optional(),
  head: z.string().optional(),
  base: z.string().optional()
})

export type ExportConfigType = {
  type: ExportType | null
  repo?: string
  title?: string
  head?: string
  base?: string
}

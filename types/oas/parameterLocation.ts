import { z } from 'npm:zod'

export const oasParameterLocation = z.enum([
  'query',
  'header',
  'path',
  'cookie'
])

export type OasParameterLocation = z.infer<typeof oasParameterLocation>

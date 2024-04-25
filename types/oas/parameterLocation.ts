import { z } from 'zod'

export type OasParameterLocation = 'query' | 'header' | 'path' | 'cookie'

export const oasParameterLocation = z.enum([
  'query',
  'header',
  'path',
  'cookie'
])

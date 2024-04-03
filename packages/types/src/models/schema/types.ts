import { z } from 'zod'

const githubSchema = z.object({
  sourceType: z.enum(['github']),
  repoOwner: z.string(),
  repoName: z.string(),
  path: z.string()
})

const textSchema = z.object({
  sourceType: z.enum(['text'])
})

const urlSchema = z.object({
  sourceType: z.enum(['url']),
  url: z.string()
})

const meta = z.discriminatedUnion('sourceType', [
  githubSchema,
  textSchema,
  urlSchema
])

const schemaFormat = z.enum(['json', 'yaml'])

export type SchemaFormat = z.infer<typeof schemaFormat>

export const schemaModel = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  schemaSource: z.enum(['github', 'text', 'url']),
  schemaFormat: schemaFormat,
  meta,
  hash: z.string(),
  ownerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type SchemaModel = z.infer<typeof schemaModel>

export const schemaModels = z.array(schemaModel)

export type SchemaModels = z.infer<typeof schemaModels>

export const schemaInitialModel = meta.and(z.object({ content: z.string() }))

export type SchemaInitialModel = z.infer<typeof schemaInitialModel>

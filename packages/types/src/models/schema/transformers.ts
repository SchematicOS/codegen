import { z } from 'zod'

export const sourceFormValues = z.union([
  z.object({
    sourceType: z.literal('github'),
    repo: z.string(),
    path: z.array(
      z.object({ name: z.string(), type: z.enum(['unknown', 'dir', 'file']) })
    ),
    content: z.string()
  }),
  z.object({
    sourceType: z.literal('url'),
    url: z.string(),
    content: z.string()
  }),
  z.object({
    sourceType: z.literal('text'),
    content: z.string()
  }),
  z.object({
    sourceType: z.null(),
    content: z.literal('')
  })
])

export type SourceFormValues =
  | GithubSourceFormValues
  | UrlSourceFormValues
  | TextSourceFormValues
  | EmptySourceFormValues

export type GithubSourceFormValues = {
  sourceType: 'github'
  repo: string
  path: PathChunk[]
  content: string
}

export type PathChunk = {
  name: string
  type: 'dir' | 'file' | 'unknown'
}

export type UrlSourceFormValues = {
  sourceType: 'url'
  url: string
  content: string
}

export type TextSourceFormValues = {
  sourceType: 'text'
  content: string
}

export type SourceFormContent = {
  content: string
}

export type EmptySourceFormValues = {
  sourceType: null
  content: ''
}

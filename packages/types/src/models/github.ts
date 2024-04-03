import { z } from 'zod'

export const githubRepoSummary = z.object({
  id: z.number().min(1, { message: 'id is required' }),
  name: z.string().min(1, { message: 'name is required' }),
  owner: z.string().min(1, { message: 'owner is required' })
})

export type GithubRepoSummary = z.infer<typeof githubRepoSummary>

export const githubRepoSummaries = z.array(githubRepoSummary)

export type GithubRepoSummaries = z.infer<typeof githubRepoSummaries>

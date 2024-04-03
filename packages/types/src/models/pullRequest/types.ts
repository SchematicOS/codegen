import { z } from 'zod'

export const pullRequestType = z.object({
  owner: z.string(),
  repo: z.string(),
  title: z.string(), // 'pull request title'
  head: z.string(), // : 'pull-request-branch-name'
  base: z.string(), // : 'main' /* optional: defaults to default branch */
  files: z.record(z.string())
})

export type PullRequestType = z.infer<typeof pullRequestType>

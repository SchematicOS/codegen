import { z } from 'zod'

const denoDeploymentStatus = z.enum(['pending', 'success', 'failed'])

export const denoDeploymentModel = z.object({
  id: z.string(),
  projectId: z.string(),
  status: denoDeploymentStatus
})

export type DenoDeploymentModel = z.infer<typeof denoDeploymentModel>

export type DenoFile = {
  kind: string
  content: string
  encoding: string
}

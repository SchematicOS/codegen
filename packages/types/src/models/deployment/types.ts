import { z } from 'zod'

export const deploymentInitialModel = z.object({
  transformerIds: z.array(z.string())
})

export const deploymentModel = z.object({
  id: z.string(),
  ownerId: z.string(),
  createdAt: z.string(),
  denoProjectId: z.string(),
  denoProjectName: z.string(),
  url: z.string().optional(),
  updatedAt: z.string().optional()
})

export type DeploymentModel = z.infer<typeof deploymentModel>

import { settingsConfigType } from 'models/settingsConfig/types.ts'
import { prettierConfigType } from 'models/prettierConfig/types.ts'
import { generateConfigType } from 'models/generateConfig/types.ts'
import { z } from 'zod'
import { oasRoot } from 'engine/oasTypes.ts'

export const generatePayload = z.object({
  schemaModel: oasRoot,
  settingsConfig: settingsConfigType,
  prettierConfig: prettierConfigType.optional(),
  generateConfig: generateConfigType
})

export type GeneratePayload = z.infer<typeof generatePayload>

export const artifactsMapModel = z.record(z.string())

export type ArtifactsMapModel = Record<string, string>

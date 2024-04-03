import { SettingsConfigType } from 'models/settingsConfig/types.ts'

export const createInitialSettingsConfig = (
  schemaHash: string,
  exportPath: string
): SettingsConfigType => ({
  schemaHash,
  exportPath,
  transformers: {}
})

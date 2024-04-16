import { toRefName } from '../helpers/ref.ts'
import { ModelSettings } from './ModelSettings.ts'
import type { SettingsType } from '@schematicos/types'
import { TransformerSettings } from 'generate/settings/TransformerSettings.ts'

export const defaultExportPath = './src/index.ts'

export class Settings {
  settings: SettingsType

  constructor(settings: SettingsType) {
    this.settings = settings
  }

  getTransformerSettings(transformerId: string): TransformerSettings {
    const transformerSettings = this.settings?.transformers?.[transformerId]

    return TransformerSettings.create({
      settings: transformerSettings,
      parentExportPath: this.getExportPath()
    })
  }

  getModelSettings($ref: string): ModelSettings {
    const modelName = toRefName($ref)

    const modelSettings = this.settings?.components?.models?.[modelName]

    return ModelSettings.create({
      settings: modelSettings,
      parentExportPath: this.getExportPath()
    })
  }

  getExportPath(): string {
    return this.settings.exportPath ?? defaultExportPath
  }
}

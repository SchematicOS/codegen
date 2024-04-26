import { toRefName } from '../helpers/ref.ts'
import { ModelSettings } from './ModelSettings.ts'
import type { SettingsType } from '../schematic-types/settings.ts'
import { TransformerSettings } from './TransformerSettings.ts'

export class Settings {
  settings: SettingsType

  private constructor(settings: SettingsType) {
    this.settings = settings
  }

  static create(settings: SettingsType): Settings {
    return new Settings(settings)
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

    const modelSettings = this.settings?.components?.schemas?.[modelName]

    return ModelSettings.create(modelSettings, this.getExportPath())
  }

  getExportPath(): string {
    return this.settings.exportPath ?? ''
  }
}

import type { ModelSettingsType } from '@schematicos/types'
import { join } from 'path'

type ModelSettingsArgs = {
  settings: ModelSettingsType | undefined
  parentExportPath?: string
}

export class ModelSettings {
  settings: ModelSettingsType | undefined
  parentExportPath: string

  private constructor({ settings, parentExportPath = '' }: ModelSettingsArgs) {
    this.settings = settings
    this.parentExportPath = parentExportPath
  }

  static create({
    settings,
    parentExportPath
  }: ModelSettingsArgs): ModelSettings {
    return new ModelSettings({
      settings,
      parentExportPath
    })
  }

  isSelected(): boolean {
    return this.settings?.selected ?? defaultModelConfig.selected
  }

  getExportPath(): string {
    return join(this.parentExportPath, this.settings?.exportPath ?? '')
  }

  getRenameTo(): string | undefined {
    return this.settings?.renameTo
  }
}

export const defaultModelConfig: ModelSettingsType = {
  selected: true
}

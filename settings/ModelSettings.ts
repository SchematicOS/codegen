import type { ModelSettingsType } from '../schematicTypes/settings.ts'
import { join } from 'path'
import { defaultFileName } from '../typescript/defaults.ts'

type ModelSettingsArgs = {
  selected?: boolean
  renameTo?: string
  importFrom?: string
  exportPath?: string
}

export class ModelSettings {
  settings: ModelSettingsType | undefined
  parentExportPath: string

  private constructor(settings: ModelSettingsType, parentExportPath: string) {
    this.settings = settings
    this.parentExportPath = parentExportPath
  }

  static create(
    { selected = true, exportPath, renameTo }: ModelSettingsArgs = {},
    parentExportPath = ''
  ): ModelSettings {
    return new ModelSettings(
      { selected, exportPath, renameTo },
      parentExportPath
    )
  }

  isSelected(): boolean {
    return this.settings?.selected ?? defaultModelConfig.selected
  }

  getExportPath(): string {
    return join(
      this.parentExportPath,
      this.settings?.exportPath ?? defaultFileName
    )
  }

  getRenameTo(): string | undefined {
    return this.settings?.renameTo
  }
}

export const defaultModelConfig: ModelSettingsType = {
  selected: true
}

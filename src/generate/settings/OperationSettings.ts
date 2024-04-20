import type { OperationSettingsType } from '@schematicos/types'
import { join } from 'path'
import { defaultFileName } from 'typescript/defaults.ts'

type OperationSettingsArgs = {
  settings?: OperationSettingsType
  parentExportPath: string
}

export class OperationSettings {
  settings?: OperationSettingsType
  parentExportPath: string

  private constructor({ settings, parentExportPath }: OperationSettingsArgs) {
    this.settings = settings
    this.parentExportPath = parentExportPath
  }

  static create({
    settings,
    parentExportPath
  }: OperationSettingsArgs): OperationSettings {
    return new OperationSettings({
      settings,
      parentExportPath
    })
  }

  isSelected(): boolean {
    return this.settings?.selected ?? defaultOperationConfig.selected
  }

  getExportPath(): string {
    return join(
      this.parentExportPath,
      this.settings?.exportPath ?? defaultFileName
    )
  }
}

export const defaultOperationConfig: OperationSettingsType = {
  selected: true
}

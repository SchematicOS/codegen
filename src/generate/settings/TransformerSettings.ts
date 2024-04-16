import type { TransformerSettingsType, Method } from '@schematicos/types'
import { OperationSettings } from 'generate/settings/OperationSettings.ts'
import { join } from 'path'

type ConstructorArgs = {
  settings?: TransformerSettingsType
  parentExportPath: string
}

type TransformerSettingsArgs = {
  settings?: TransformerSettingsType
  selected?: boolean
  parentExportPath: string
}

type GetOperationSettingsArgs = {
  path: string
  method: Method
}

export class TransformerSettings {
  settings?: TransformerSettingsType
  selected?: boolean
  parentExportPath: string

  private constructor({ settings, parentExportPath }: ConstructorArgs) {
    this.settings = settings
    this.parentExportPath = parentExportPath
  }

  static create({
    settings,
    parentExportPath
  }: TransformerSettingsArgs): TransformerSettings {
    return new TransformerSettings({
      settings,
      parentExportPath
    })
  }

  isSelected(): boolean {
    return this.selected ?? true
  }

  getExportPath(): string {
    return join(this.parentExportPath, this.settings?.root?.exportPath ?? '')
  }

  getOperationSettings({
    path,
    method
  }: GetOperationSettingsArgs): OperationSettings {
    return OperationSettings.create({
      settings: this.settings?.operations?.[path]?.[method],
      parentExportPath: this.getExportPath()
    })
  }
}

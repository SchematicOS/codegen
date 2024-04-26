import type { TransformerSettingsType } from '../schematic-types/settings.ts'
import { OperationSettings } from './OperationSettings.ts'
import { join } from '@std/path'
import { defaultFileName } from '../typescript/defaults.ts'
import type { Method } from '../schematic-types/method.ts'

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

type GetExportPathArgs = {
  appendFileName?: boolean
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

  getExportPath({ appendFileName }: GetExportPathArgs): string {
    return join(
      this.parentExportPath,
      this.settings?.root?.exportPath ?? '',
      appendFileName
        ? this.settings?.root?.exportFileName ?? defaultFileName
        : ''
    )
  }

  getOperationSettings({
    path,
    method
  }: GetOperationSettingsArgs): OperationSettings {
    return OperationSettings.create({
      settings: this.settings?.operations?.[path]?.[method],
      parentExportPath: this.getExportPath({ appendFileName: false })
    })
  }
}

type ModelSettingsArgs = {
  selected?: boolean
  exportPath: string
  renameTo?: string
}

export class ModelSettings {
  selected: boolean
  exportPath: string
  renameTo: string | undefined

  private constructor({
    selected = true,
    exportPath,
    renameTo = undefined
  }: ModelSettingsArgs) {
    this.selected = selected
    this.exportPath = exportPath
    this.renameTo = renameTo
  }

  static create({ selected, exportPath, renameTo }: ModelSettingsArgs): ModelSettings {
    return new ModelSettings({
      selected,
      exportPath,
      renameTo
    })
  }

  isSelected(): boolean {
    return this.selected
  }

  getExportPath(): string {
    return this.exportPath
  }

  getRenameTo(): string | undefined{
    return this.renameTo
  }
}

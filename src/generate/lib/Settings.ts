import { toRefName } from '../helpers/ref.ts'
import { ModelSettings } from './ModelSettings.ts'
import type {
  Method,
  ModelConfigType,
  OperationConfigType,
  SettingsConfigType
} from '@schematicos/types'
import { join } from 'path'

type GetOperationConfigArgs = {
  transformerId: string
  path: string
  method: Method
}

const defaultOperationConfig: OperationConfigType = {
  selected: true
}

const defaultModelConfig: ModelConfigType = {
  selected: true
}

export const defaultExportPath = './src/index.ts'

export class Settings {
  settingsConfig: SettingsConfigType

  constructor(settingsConfig: SettingsConfigType) {
    this.settingsConfig = settingsConfig
  }

  getOperationSettings({
    transformerId,
    path,
    method
  }: GetOperationConfigArgs): OperationSettings {
    const transformerSettings =
      this.settingsConfig?.transformers?.[transformerId]

    const operationSettings = transformerSettings?.operations?.[path]?.[method]

    return {
      isSelected: () => {
        return operationSettings?.selected ?? defaultOperationConfig.selected
      },
      getExportPath: () => {
        const top = this.settingsConfig.exportPath
        const transformer = transformerSettings?.root?.exportPath
        const operation = operationSettings?.exportPath

        return joinPaths({
          paths: [top, transformer, operation],
          fallback: defaultExportPath
        })
      }
    }
  }

  getTransformerSettings(transformerId: string): TransformerSettings {
    const transformerSettings =
      this.settingsConfig?.transformers?.[transformerId]

    return {
      getExportPath: () => {
        const top = this.settingsConfig.exportPath
        const transformer = transformerSettings?.root?.exportPath

        return joinPaths({
          paths: [top, transformer],
          fallback: defaultExportPath
        })
      },
      getOperationSettings: ({ path, method }: GetOperationSettingsArgs) => {
        return this.getOperationSettings({ transformerId, path, method })
      }
    }
  }

  getModelSettings($ref: string): ModelSettings {
    const modelName = toRefName($ref)

    const modelSettings = this.settingsConfig?.components?.models?.[modelName]

    const top = this.settingsConfig.exportPath
    const model = modelSettings?.exportPath

    return ModelSettings.create({
      selected: modelSettings?.selected ?? defaultModelConfig.selected,
      renameTo: modelSettings?.renameTo,
      exportPath: joinPaths({
        paths: [top, model],
        fallback: defaultExportPath
      }),
    })
  }

  getExportPath(): string {
    return this.settingsConfig.exportPath ?? defaultExportPath
  }
}

export type OperationSettings = {
  isSelected: () => boolean
  getExportPath: () => string
}

type GetOperationSettingsArgs = {
  path: string
  method: Method
}

export type TransformerSettings = {
  getExportPath: () => string
  getOperationSettings: ({
    path,
    method
  }: GetOperationSettingsArgs) => OperationSettings
}

type JoinPathArgs = {
  paths: (string | undefined)[]
  fallback: string
}

const joinPaths = ({ paths, fallback }: JoinPathArgs) => {
  const filteredPaths = [...paths].filter((item): item is string =>
    Boolean(item)
  )

  return filteredPaths.length ? join(...filteredPaths) : fallback
}

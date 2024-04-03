import { Method, method } from 'models/method/types.ts'
import { z } from 'zod'

export const defaultExportPath = './src/index.ts'

export const selectableType = z.object({ selected: z.boolean().optional() })

export type SelectableType = {
  selected?: boolean
}

export const renamableType = z.object({
  renameTo: z.string().optional()
})

export type RenamableType = {
  renameTo?: string
}

export const importableType = z.object({
  importFrom: z.string().optional(),
  exportPath: z.string().optional()
})

export type ImportableType = {
  importFrom?: string
  exportPath?: string
}

export const modelConfigType = z.object({
  selected: z.boolean().optional(),
  renameTo: z.string().optional(),
  importFrom: z.string().optional(),
  exportPath: z.string().optional()
})

export type ModelConfigType = {
  selected?: boolean
  renameTo?: string
  importFrom?: string
  exportPath?: string
}

export type ModelConfigKeyType =
  | 'selected'
  | 'renameTo'
  | 'importFrom'
  | 'exportPath'

export const componentsConfigType = z.object({
  models: z.record(modelConfigType).optional()
})

export type ComponentsConfigType = {
  models?: Record<string, ModelConfigType>
}

export const transformerComponentsConfigType = z.object({
  models: z.record(modelConfigType).optional()
})

export type TransformerComponentsConfigType = {
  models?: Record<string, ModelConfigType>
}

export const transformerConfigType = z.object({
  root: z.record(z.string()).optional(),
  operations: z.record(z.record(method, modelConfigType)).optional(),
  components: transformerComponentsConfigType.optional()
})

export type TransformerConfigType = {
  root?: Record<string, string>
  operations?: Record<string, Partial<Record<Method, ModelConfigType>>>
  components?: TransformerComponentsConfigType
}

export const settingsConfigType = z.object({
  schemaHash: z.string().optional(),
  exportPath: z.string().optional(),
  transformers: z.record(transformerConfigType).optional(),
  components: componentsConfigType.optional()
})

export type SettingsConfigType = {
  schemaHash?: string
  exportPath?: string
  transformers?: Record<string, TransformerConfigType>
  components?: ComponentsConfigType
}

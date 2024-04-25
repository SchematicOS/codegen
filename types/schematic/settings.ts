import { type Method, method } from 'types/schematic/method.ts'
import { z } from 'npm:zod'

export const selectableType = z.object({ selected: z.boolean().optional() })

export type SelectableType = {
  selected: boolean
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

export const modelSettingsType = z.object({
  selected: z.boolean(),
  renameTo: z.string().optional(),
  importFrom: z.string().optional(),
  exportPath: z.string().optional()
})

export type ModelSettingsType = {
  selected: boolean
  renameTo?: string
  importFrom?: string
  exportPath?: string
}

export type ModelSettingsKeyType =
  | 'selected'
  | 'renameTo'
  | 'importFrom'
  | 'exportPath'

export const operationSettingsType = z.object({
  selected: z.boolean(),
  importFrom: z.string().optional(),
  exportPath: z.string().optional()
})

export type OperationSettingsType = {
  selected: boolean
  importFrom?: string
  exportPath?: string
}

export type OperationSettingsKeyType = 'selected' | 'importFrom' | 'exportPath'

export const componentsSettingsType = z.object({
  schemas: z.record(modelSettingsType).optional()
})

export type ComponentsSettingsType = {
  schemas?: Record<string, ModelSettingsType>
}

export const transformerComponentsSettingsType = z.object({
  models: z.record(modelSettingsType).optional()
})

export type TransformerComponentsSettingsType = {
  models?: Record<string, ModelSettingsType>
}

export const transformerSettingsType = z.object({
  root: z.record(z.string()).optional(),
  operations: z.record(z.record(method, operationSettingsType)).optional(),
  components: transformerComponentsSettingsType.optional()
})

export type TransformerSettingsType = {
  root?: Record<string, string>
  operations?: Record<string, Partial<Record<Method, OperationSettingsType>>>
  components?: TransformerComponentsSettingsType
}

export const settingsType = z.object({
  schemaHash: z.string().optional(),
  exportPath: z.string().optional(),
  transformers: z.record(transformerSettingsType).optional(),
  components: componentsSettingsType.optional()
})

export type SettingsType = {
  schemaHash?: string
  exportPath?: string
  transformers?: Record<string, TransformerSettingsType>
  components?: ComponentsSettingsType
}

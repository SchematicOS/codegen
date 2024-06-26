import { type Method, method } from './method.ts'
import { z } from 'zod'

export const selectableType: z.ZodType<SelectableType> = z.object({
  selected: z.boolean()
})

export type SelectableType = {
  selected: boolean
}

export const renamableType: z.ZodType<RenamableType> = z.object({
  renameTo: z.string().optional()
})

export type RenamableType = {
  renameTo?: string
}

export const importableType: z.ZodType<ImportableType> = z.object({
  importFrom: z.string().optional(),
  exportPath: z.string().optional()
})

export type ImportableType = {
  importFrom?: string
  exportPath?: string
}

export const modelSettingsType: z.ZodType<ModelSettingsType> = z.object({
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

export const operationSettingsType: z.ZodType<OperationSettingsType> = z.object(
  {
    selected: z.boolean(),
    importFrom: z.string().optional(),
    exportPath: z.string().optional()
  }
)

export type OperationSettingsType = {
  selected: boolean
  importFrom?: string
  exportPath?: string
}

export type OperationSettingsKeyType = 'selected' | 'importFrom' | 'exportPath'

export const componentsSettingsType: z.ZodType<ComponentsSettingsType> =
  z.object({
    schemas: z.record(modelSettingsType).optional()
  })

export type ComponentsSettingsType = {
  schemas?: Record<string, ModelSettingsType>
}

export const transformerComponentsSettingsType: z.ZodType<TransformerComponentsSettingsType> =
  z.object({
    models: z.record(modelSettingsType).optional()
  })

export type TransformerComponentsSettingsType = {
  models?: Record<string, ModelSettingsType>
}

export const transformerSettingsType: z.ZodType<TransformerSettingsType> =
  z.object({
    root: z.record(z.string()).optional(),
    operations: z.record(z.record(method, operationSettingsType)).optional(),
    components: transformerComponentsSettingsType.optional()
  })

export type TransformerSettingsType = {
  root?: Record<string, string>
  operations?: Record<string, Partial<Record<Method, OperationSettingsType>>>
  components?: TransformerComponentsSettingsType
}

export const settingsType: z.ZodType<SettingsType> = z.object({
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

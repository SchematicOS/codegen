import { z } from 'zod'
import type { ComponentType } from 'react'
import { OasSchema } from 'engine/schemaValues.ts'
import { OasVoid } from 'engine/void/types.ts'
import { OasSchemaRef } from 'engine/ref/types.ts'
import { ImportName } from 'types/importName.ts'

export const customStringSettingType = z.object({
  name: z.string(),
  label: z.string(),
  required: z.boolean().optional(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.literal('string'),
  value: z.string()
})

export const customSettingType = customStringSettingType

export type CustomStringSettingType = {
  name: string
  label: string
  required?: boolean
  description?: string
  placeholder?: string
  type: 'string'
  value: string
}

export type CustomSettingType = CustomStringSettingType

export const transformerSettingsType = z.object({
  root: z.array(customSettingType).optional(),
  operations: z.array(customSettingType).optional(),
  components: z
    .object({
      models: z.array(customSettingType).optional()
    })
    .optional()
})

export type TransformerSettingsType = {
  root?: CustomSettingType[]
  operations?: CustomSettingType[]
  components?: {
    models?: CustomSettingType[]
  }
}

export const transformerType = z.enum(['transformer', 'type_system'])

export type TransformerType = z.infer<typeof transformerType>

export const transformerInitialModel = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  content: z.record(z.string()),
  settings: z.union([transformerSettingsType.optional(), z.null()]),
  type: transformerType
})

export type TransformerInitialModel = z.infer<typeof transformerInitialModel>

export const transformerModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  content: z.record(z.string()),
  settings: z.union([transformerSettingsType.optional(), z.null()]),
  type: transformerType,
  deployed: z.boolean(),
  ownerId: z.string(),
  createdAt: z.string()
})

export type TransformerModel = z.infer<typeof transformerModel>

export const transformerModels = z.array(transformerModel)

export type TransformerModels = z.infer<typeof transformerModels>

export type LoadedTransformer = {
  id: string
  name: string
  component: ComponentType
}

export type TypeSystemProps = {
  value: OasSchema | OasVoid | OasSchemaRef
  required: boolean
}

export type LoadedTypeSystem = {
  id: string
  name: string
  component: ComponentType<TypeSystemProps>
  formatIdentifierName: (name: ImportName) => ImportName
  type: 'value' | 'type'
}

export type Transformers = {
  transformers: LoadedTransformer[]
  typeSystem: LoadedTypeSystem
}

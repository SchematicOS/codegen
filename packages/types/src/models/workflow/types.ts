import {
  SettingsConfigType,
  settingsConfigType
} from 'models/settingsConfig/types.ts'
import {
  GenerateConfigType,
  generateConfigType
} from 'models/generateConfig/types.ts'
import { z } from 'zod'
import {
  SourceFormValues,
  sourceFormValues
} from 'models/schema/transformers.ts'
import {
  ExportConfigType,
  exportConfigType
} from 'models/exportConfig/types.ts'

const schemaNodeModel = z.object({
  id: z.string(),
  type: z.literal('schema'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({
    schemaId: z.string().optional(),
    source: sourceFormValues.optional()
  })
})

const exportNodeModel = z.object({
  id: z.string(),
  type: z.literal('export'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({
    exportConfig: exportConfigType.optional()
  })
})

const openSchemaNodeModel = z.object({
  id: z.string(),
  type: z.literal('open-schema'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({
    source: sourceFormValues.optional()
  })
})

const generateNodeModel = z.object({
  id: z.string(),
  type: z.literal('generate'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({
    generateConfig: generateConfigType.optional()
  })
})

const artifactsNodeModel = z.object({
  id: z.string(),
  type: z.literal('artifacts'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({})
})

const settingsNodeModel = z.object({
  id: z.string(),
  type: z.literal('settings'),
  position: z.object({ x: z.number(), y: z.number() }),
  selected: z.boolean().optional(),
  data: z.object({
    settingsConfig: settingsConfigType.optional()
  })
})

export const workflowContent = z.object({
  nodes: z.array(
    z.discriminatedUnion('type', [
      exportNodeModel,
      openSchemaNodeModel,
      schemaNodeModel,
      generateNodeModel,
      artifactsNodeModel,
      settingsNodeModel
    ])
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
      animated: z.boolean().optional()
    })
  )
})

export const workflowInitialModel = z.object({
  name: z.string(),
  content: workflowContent
})

export type WorkflowInitialModel = z.infer<typeof workflowInitialModel>

export const workflowModel = z.object({
  id: z.string(),
  name: z.string(),
  content: workflowContent,
  ownerId: z.string(),
  createdAt: z.string()
})

export type WorkflowModel = z.infer<typeof workflowModel>

export const workflowModels = z.array(workflowModel)

export type WorkflowModels = z.infer<typeof workflowModels>

export type WorkflowContent = {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export type WorkflowNode = BaseNode &
  (
    | SchemaNode
    | ExportNode
    | GenerateNode
    | ArtifactsNode
    | SettingsNode
    | OpenSchemaNode
  )

export type BaseNode = {
  id: string
  position: { x: number; y: number }
  parentNodeId?: string
  selected?: boolean
}

export type SchemaNode = {
  type: 'schema'
  data: SchemaNodeData
}

export type SchemaNodeData = {
  schemaId?: string
  source?: SourceFormValues
}

export type OpenSchemaNode = {
  type: 'open-schema'
  data: OpenSchemaNodeData
}

export type OpenSchemaNodeData = {
  source?: SourceFormValues
}

export type GenerateNode = {
  type: 'generate'
  data: GenerateNodeData
}

export type GenerateNodeData = {
  generateConfig?: GenerateConfigType
}

export type ArtifactsNode = {
  type: 'artifacts'
  data: ArtifactsNodeData
}

export type ArtifactsNodeData = Record<string, never>

export type SettingsNode = {
  type: 'settings'
  data: SettingsNodeData
}

export type ExportNode = {
  type: 'export'
  data: ExportNodeData
}

export type ExportNodeData = {
  exportConfig?: ExportConfigType
}

export type SettingsNodeData = {
  settingsConfig?: SettingsConfigType
}

export type MenuNode = {
  type: 'menu'
  data: MenuNodeData
}

type MenuNodeDataItem = {
  label: string
  node: WorkflowNode
}

export type MenuNodeData = {
  items: MenuNodeDataItem[]
}

export type WorkflowEdge = {
  id: string
  source: string
  target: string
  animated?: boolean
}

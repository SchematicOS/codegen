import { markdown } from './markdown.ts'
import { type OasParameterData, oasParameterData } from './parameter.ts'
import { type OasPathItemData, oasPathItemData } from './pathItem.ts'
import {
  type OasParameterRefData,
  type OasRequestBodyRefData,
  type OasResponseRefData,
  oasParameterRefData,
  oasRequestBodyRefData,
  oasResponseRefData
} from './ref.ts'
import { type OasRequestBodyData, oasRequestBodyData } from './requestBody.ts'
import { type OasResponseData, oasResponseData } from './response.ts'
import { z } from 'zod'

export type OasOperationData = {
  schematicType: 'operation'
  pathItem: OasPathItemData
  path: string
  method:
    | 'get'
    | 'put'
    | 'post'
    | 'delete'
    | 'options'
    | 'head'
    | 'patch'
    | 'trace'
  operationId?: string
  tags?: string[]
  summary?: string
  description?: string
  // externalDocs?: ExternalDocs
  // operationId?: string
  parameters?: (OasParameterData | OasParameterRefData)[]
  requestBody?: OasRequestBodyData | OasRequestBodyRefData
  responses: Record<string, OasResponseData | OasResponseRefData>
  // callbacks: never
  deprecated?: boolean
  // security: never
  // servers?: Server[]
}

export const oasOperationData: z.ZodType<OasOperationData> = z.object({
  schematicType: z.literal('operation'),
  pathItem: oasPathItemData,
  path: z.string(),
  method: z.enum([
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace'
  ]),
  operationId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
  description: markdown.optional(),
  // externalDocs: externalDocs.optional(),
  // operationId: z.string().optional(),
  parameters: z
    .array(z.union([oasParameterData, oasParameterRefData]))
    .optional(),
  requestBody: z.union([oasRequestBodyData, oasRequestBodyRefData]).optional(),
  responses: z.record(z.union([oasResponseData, oasResponseRefData])),
  // callbacks: z.never(),
  deprecated: z.boolean().optional()
  // security: z.never(),
  // servers: z.array(server).optional()
})

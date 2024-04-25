import { markdown } from './markdown.ts'
import { oasParameterData } from './parameter.ts'
import { oasPathItemData } from './pathItem.ts'
import {
  oasParameterRefData,
  oasRequestBodyRefData,
  oasResponseRefData
} from './ref.ts'
import { oasRequestBodyData } from './requestBody.ts'
import { oasResponseData } from './response.ts'
import { z } from 'zod'

export const oasOperationData = z.object({
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
export type OasOperationData = z.infer<typeof oasOperationData>

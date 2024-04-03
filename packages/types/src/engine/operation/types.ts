import { markdown } from 'engine/markdown/types.ts'
import { oasParameter } from 'engine/parameter/types.ts'
import { oasPathItem } from 'engine/pathItem/types.ts'
import {
  oasParameterRef,
  oasRequestBodyRef,
  oasResponseRef
} from 'engine/ref/types.ts'
import { oasRequestBody } from 'engine/requestBody/types.ts'
import { oasResponse } from 'engine/response/types.ts'
import { z } from 'zod'

export const oasOperation = z.object({
  schematicType: z.literal('operation'),
  pathItem: oasPathItem,
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
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
  description: markdown.optional(),
  // externalDocs: externalDocs.optional(),
  // operationId: z.string().optional(),
  parameters: z.array(z.union([oasParameter, oasParameterRef])).optional(),
  requestBody: z.union([oasRequestBody, oasRequestBodyRef]).optional(),
  responses: z.record(z.union([oasResponse, oasResponseRef])),
  // callbacks: z.never(),
  deprecated: z.boolean().optional()
  // security: z.never(),
  // servers: z.array(server).optional()
})
export type OasOperation = z.infer<typeof oasOperation>

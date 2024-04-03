import { oasExample } from 'engine/example/types.ts'
import { oasHeader } from 'engine/header/types.ts'
import { markdown } from 'engine/markdown/types.ts'
import { OasMediaTypeItem } from 'engine/mediaItem/types.ts'
import { oasOperation } from 'engine/operation/types.ts'
import { oasParameter } from 'engine/parameter/types.ts'
import { oasPathItem } from 'engine/pathItem/types.ts'
import {
  oasExampleRef,
  oasHeaderRef,
  oasParameterRef,
  oasPathItemRef,
  oasRequestBodyRef,
  oasResponseRef,
  oasSchemaRef
} from 'engine/ref/types.ts'
import { oasRequestBody } from 'engine/requestBody/types.ts'
import { oasResponse } from 'engine/response/types.ts'
import { oasSchema } from 'engine/schemaValues.ts'
import { url } from 'engine/url/types.ts'
import { z } from 'zod'

// TODO Next
// 1. When parsing detect values that I am not handling
// 2. Add schematicType to each object
// 4. Possibly store 'original' value in each object
// 5. Add path and method to Response object
// 6. Add ref type to refs
// 7. Add index value to objects converted to arrays

const openapi = z.string()

export const oasContact = z.object({
  schematicType: z.literal('contact'),
  name: z.string().optional(),
  url: url.optional(),
  email: z.string().email().optional()
})

export type OasContact = z.infer<typeof oasContact>

export const oasLicense = z.object({
  schematicType: z.literal('license'),
  name: z.string(),
  url: url.optional(),
  identifier: z.string().optional()
})

export type OasLicense = z.infer<typeof oasLicense>

export const oasInfo = z.object({
  schematicType: z.literal('info'),
  title: z.string(),
  summary: z.string().optional(),
  description: markdown.optional(),
  termsOfService: url.optional(),
  contact: oasContact.optional(),
  license: oasLicense.optional(),
  version: z.string()
})

export type OasInfo = z.infer<typeof oasInfo>

export type OasContent = Record<string, OasMediaTypeItem>

export const oasComponents = z.object({
  schematicType: z.literal('components'),
  models: z.record(z.union([oasSchema, oasSchemaRef])).optional(),
  responses: z.record(z.union([oasResponse, oasResponseRef])).optional(),
  parameters: z.record(z.union([oasParameter, oasParameterRef])).optional(),
  examples: z.record(z.union([oasExample, oasExampleRef])).optional(),
  requestBodies: z
    .record(z.union([oasRequestBody, oasRequestBodyRef]))
    .optional(),
  headers: z.record(z.union([oasHeader, oasHeaderRef])).optional(),
  // securitySchemes: z.record(z.union([securityScheme, ref])),
  // links: z.record(z.union([link, ref])),
  // callbacks: z.never(),
  pathItems: z.record(z.union([oasPathItem, oasPathItemRef])).optional()
})

export type OasComponents = z.infer<typeof oasComponents>

export const oasComponentType = z.union([
  oasSchema,
  oasResponse,
  oasParameter,
  oasExample,
  oasRequestBody,
  oasHeader,
  oasPathItem
])

export type OasComponentType = z.infer<typeof oasComponentType>

export const oasTag = z.object({
  schematicType: z.literal('tag'),
  name: z.string(),
  description: markdown.optional()
  // externalDocs: externalDocs.optional()
})

export type OasTag = z.infer<typeof oasTag>

export const oasRoot = z.object({
  schematicType: z.literal('openapi'),
  openapi: openapi,
  info: oasInfo,
  jsonSchemaDialect: url.optional(),
  // servers: z.array(server).optional(),
  operations: z.array(oasOperation),
  // webhooks: z.record(z.union([pathItem, ref])).optional(),
  components: oasComponents.optional(),
  // security: z.never(),
  tags: z.array(oasTag).optional()
  // externalDocs: externalDocs.optional()
})

export type OasRoot = z.infer<typeof oasRoot>

export const notImplemented = z.object({
  schematicType: z.literal('notImplemented'),
  message: z.string().optional()
})

// Unused stuff below

const flows = z.object({
  implicit: z
    .object({
      authorizationUrl: url,
      refreshUrl: url.optional(),
      scopes: z.record(z.string())
    })
    .optional(),
  password: z
    .object({
      tokenUrl: url,
      refreshUrl: url.optional(),
      scopes: z.record(z.string())
    })
    .optional(),
  clientCredentials: z
    .object({
      tokenUrl: url,
      refreshUrl: url.optional(),
      scopes: z.record(z.string())
    })
    .optional(),
  authorizationCode: z
    .object({
      authorizationUrl: url,
      tokenUrl: url,
      refreshUrl: url.optional(),
      scopes: z.record(z.string())
    })
    .optional()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const securityScheme = z
  .object({
    description: markdown.optional()
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('apiKey'),
        name: z.string().optional(),
        in: z.enum(['query', 'header', 'cookie']).optional()
      }),
      z.object({
        type: z.literal('http'),
        scheme: z.string(),
        bearerFormat: z.string().optional()
      }),
      z.object({
        type: z.literal('oauth2'),
        flows: flows
      }),
      z.object({
        type: z.literal('openIdConnect'),
        openIdConnectUrl: url
      }),
      z.object({
        type: z.literal('mutualTLS')
      })
    ])
  )

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const externalDocs = z.object({
  url: url,
  description: markdown.optional()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const xml = z.object({
  name: z.string().optional(),
  namespace: z.string().optional(),
  prefix: z.string().optional(),
  attribute: z.boolean().optional(),
  wrapped: z.boolean().optional()
})

const serverVariable = z.object({
  default: z.string(),
  description: markdown.optional(),
  enum: z.array(z.string()).nonempty().optional()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = z.object({
  url: url,
  description: markdown.optional(),
  variables: z.record(serverVariable).optional()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const link = z.object({
  operationRef: url.optional(),
  operationId: z.string().optional(),
  parameters: z.record(z.union([oasParameter, oasParameterRef])).optional(),
  requestBody: z.union([z.any(), oasRequestBodyRef]).optional(),
  description: markdown.optional()
  // server: server.optional()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const encoding = z.object({
  contentType: z.string().optional(),
  headers: z.lazy(() => z.record(z.union([oasHeader, oasHeaderRef])).optional())
  // style: z.string().optional(),
  // explode: z.boolean().optional(),
  // allowReserved: z.boolean().optional()
})

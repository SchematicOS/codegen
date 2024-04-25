import { type OasExampleData, oasExampleData } from './example.ts'
import { type OasHeaderData, oasHeaderData } from './header.ts'
import { markdown } from './markdown.ts'
import { oasOperationData } from './operation.ts'
import { type OasParameterData, oasParameterData } from './parameter.ts'
import type {
  OasExampleRefData,
  OasHeaderRefData,
  OasParameterRefData,
  OasRequestBodyRefData,
  OasSchemaRefData
} from './ref.ts'
import {
  oasExampleRefData,
  oasHeaderRefData,
  oasParameterRefData,
  oasRequestBodyRefData,
  oasResponseRefData,
  oasSchemaRefData
} from './ref.ts'
import { type OasRequestBodyData, oasRequestBodyData } from './requestBody.ts'
import { type OasResponseData, oasResponseData } from './response.ts'
import { type OasSchemaData, oasSchemaData } from './schemaValues.ts'
import { z } from 'zod'

// TODO Next
// 1. When parsing detect values that I am not handling
// 2. Add schematicType to each object
// 4. Possibly store 'original' value in each object
// 5. Add path and method to Response object
// 6. Add ref type to refs
// 7. Add index value to objects converted to arrays

const openapi = z.string()

export type OasContactData = {
  schematicType: 'contact'
  name?: string
  url?: string
  email?: string
}

export const oasContactData: z.ZodType<OasContactData> = z.object({
  schematicType: z.literal('contact'),
  name: z.string().optional(),
  url: z.string().optional(),
  email: z.string().email().optional()
})

export type OasLicenseData = {
  schematicType: 'license'
  name: string
  url?: string
  identifier?: string
}

export const oasLicenseData: z.ZodType<OasLicenseData> = z.object({
  schematicType: z.literal('license'),
  name: z.string(),
  url: z.string().optional(),
  identifier: z.string().optional()
})

export type OasInfoData = {
  schematicType: 'info'
  title: string
  description?: string
  termsOfService?: string
  contact?: OasContactData
  license?: OasLicenseData
  version: string
}

export const oasInfoData: z.ZodType<OasInfoData> = z.object({
  schematicType: z.literal('info'),
  title: z.string(),
  description: markdown.optional(),
  termsOfService: z.string().optional(),
  contact: oasContactData.optional(),
  license: oasLicenseData.optional(),
  version: z.string()
})

export type OasComponentsData = {
  schematicType: 'components'
  schemas?: Record<string, OasSchemaData | OasSchemaRefData>
  responses?: Record<string, OasResponseData | OasResponseData>
  parameters?: Record<string, OasParameterData | OasParameterRefData>
  examples?: Record<string, OasExampleData | OasExampleRefData>
  requestBodies?: Record<string, OasRequestBodyData | OasRequestBodyRefData>
  headers?: Record<string, OasHeaderData | OasHeaderRefData>
}

export const oasComponentsData = z.object({
  schematicType: z.literal('components'),
  schemas: z.record(z.union([oasSchemaData, oasSchemaRefData])).optional(),
  responses: z
    .record(z.union([oasResponseData, oasResponseRefData]))
    .optional(),
  parameters: z
    .record(z.union([oasParameterData, oasParameterRefData]))
    .optional(),
  examples: z.record(z.union([oasExampleData, oasExampleRefData])).optional(),
  requestBodies: z
    .record(z.union([oasRequestBodyData, oasRequestBodyRefData]))
    .optional(),
  headers: z.record(z.union([oasHeaderData, oasHeaderRefData])).optional()
  // securitySchemes: z.record(z.union([securityScheme, ref])),
  // links: z.record(z.union([link, ref])),
  // callbacks: z.never(),
  // pathItems: z.record(z.union([oasPathItemData, oasPathItemRefData])).optional()
})

export const oasTagData = z.object({
  schematicType: z.literal('tag'),
  name: z.string(),
  description: markdown.optional()
  // externalDocs: externalDocs.optional()
})

export type OasTagData = z.infer<typeof oasTagData>

export const OasDocumentData = z.object({
  schematicType: z.literal('openapi'),
  openapi: openapi,
  info: oasInfoData,
  jsonSchemaDialect: z.string().optional(),
  // servers: z.array(server).optional(),
  operations: z.array(oasOperationData),
  // webhooks: z.record(z.union([pathItem, ref])).optional(),
  components: oasComponentsData.optional(),
  // security: z.never(),
  tags: z.array(oasTagData).optional()
  // externalDocs: externalDocs.optional()
})

export type OasDocumentData = z.infer<typeof OasDocumentData>

export const notImplemented = z.object({
  schematicType: z.literal('notImplemented'),
  message: z.string().optional()
})

// Unused definitions below

// const flows = z.object({
//   implicit: z
//     .object({
//       authorizationUrl: z.string(),
//       refreshUrl: z.string().optional(),
//       scopes: z.record(z.string())
//     })
//     .optional(),
//   password: z
//     .object({
//       tokenUrl: z.string(),
//       refreshUrl: z.string().optional(),
//       scopes: z.record(z.string())
//     })
//     .optional(),
//   clientCredentials: z
//     .object({
//       tokenUrl: z.string(),
//       refreshUrl: z.string().optional(),
//       scopes: z.record(z.string())
//     })
//     .optional(),
//   authorizationCode: z
//     .object({
//       authorizationUrl: z.string(),
//       tokenUrl: z.string(),
//       refreshUrl: z.string().optional(),
//       scopes: z.record(z.string())
//     })
//     .optional()
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const securityScheme = z
//   .object({
//     description: markdown.optional()
//   })
//   .and(
//     z.discriminatedUnion('type', [
//       z.object({
//         type: z.literal('apiKey'),
//         name: z.string().optional(),
//         in: z.enum(['query', 'header', 'cookie']).optional()
//       }),
//       z.object({
//         type: z.literal('http'),
//         scheme: z.string(),
//         bearerFormat: z.string().optional()
//       }),
//       z.object({
//         type: z.literal('oauth2'),
//         flows: flows
//       }),
//       z.object({
//         type: z.literal('openIdConnect'),
//         openIdConnectUrl: z.string()
//       }),
//       z.object({
//         type: z.literal('mutualTLS')
//       })
//     ])
//   )

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const externalDocs = z.object({
//   url: z.string(),
//   description: markdown.optional()
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const xml = z.object({
//   name: z.string().optional(),
//   namespace: z.string().optional(),
//   prefix: z.string().optional(),
//   attribute: z.boolean().optional(),
//   wrapped: z.boolean().optional()
// })

// const serverVariable = z.object({
//   default: z.string(),
//   description: markdown.optional(),
//   enum: z.array(z.string()).nonempty().optional()
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const server = z.object({
//   url: z.string(),
//   description: markdown.optional(),
//   variables: z.record(serverVariable).optional()
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const link = z.object({
//   operationRef: z.string().optional(),
//   operationId: z.string().optional(),
//   parameters: z
//     .record(z.union([oasParameterData, oasParameterRefData]))
//     .optional(),
//   requestBody: z.union([z.any(), oasRequestBodyRefData]).optional(),
//   description: markdown.optional()
//   // server: server.optional()
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const encoding = z.object({
//   contentType: z.string().optional(),
//   headers: z.lazy(() =>
//     z.record(z.union([oasHeaderData, oasHeaderRefData])).optional()
//   )
//   // style: z.string().optional(),
//   // explode: z.boolean().optional(),
//   // allowReserved: z.boolean().optional()
// })

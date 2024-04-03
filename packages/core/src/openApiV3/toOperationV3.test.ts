import { toOperationV3 } from '@/openApiV3/toOperationV3.ts'
import { OpenAPIV3 } from 'openapi-types'
import {
  mockOasOperation,
  mockOasOperationThree,
  mockOasOperationWithParams
} from '@schematicos/types'
import { describe, expect, it } from 'vitest'
import { ParseContext } from '@/ParseContext.ts'

describe('toOperationV3', () => {
  it('should parse an operation', () => {
    const ctx = new ParseContext()

    const operationInput: OpenAPIV3.OperationObject = {
      tags: ['pet'],
      summary: 'Update an existing pet',
      description: 'Update an existing pet by Id',
      operationId: 'updatePet',
      requestBody: {
        description: 'Update an existent pet in the store',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          },
          'application/xml': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          },
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        },
        required: true
      },
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          }
        },
        '400': {
          description: 'Invalid ID supplied'
        },
        '404': {
          description: 'Pet not found'
        },
        '405': {
          description: 'Validation exception'
        }
      },
      security: [
        {
          petstore_auth: ['write:pets', 'read:pets']
        }
      ]
    }

    const response = toOperationV3(
      operationInput,
      {
        path: '/pet',
        method: 'put',
        pathItem: { schematicType: 'pathItem' }
      },
      ctx
    )

    expect(response).toEqual(mockOasOperation)
  })

  it('should parse an operation with params', () => {
    const ctx = new ParseContext()

    const operationInput: OpenAPIV3.OperationObject = {
      summary: 'List OAuth Clients',
      description: 'List all OAuth clients for Sequence account',
      tags: [],
      parameters: [
        {
          schema: {
            type: 'integer'
          },
          in: 'query',
          name: 'limit',
          required: false,
          description: 'Maximum number of objects to return per-page.'
        },
        {
          schema: {
            type: 'string'
          },
          in: 'query',
          name: 'after',
          required: false,
          description:
            'Pagination offset. To page through items, omit this parameter to retrieve the first page, and then successively use the value you get from `pagination.after` or `pagination.before` to retrieve each page.'
        },
        {
          schema: {
            type: 'string'
          },
          in: 'query',
          name: 'before',
          required: false,
          description:
            'Pagination offset. To page through items, omit this parameter to retrieve the first page, and then successively use the value you get from `pagination.next` or `pagination.previous` to retrieve each page.'
        },
        {
          schema: {
            type: 'string'
          },
          in: 'header',
          name: 'Authorization',
          required: true,
          description:
            'Your [API credentials](/docs/authentication). Eg. `Basic {credentials}`.'
        }
      ],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              example: {
                items: [
                  {
                    id: '7b1f28b9-a4ad-450b-a0ea-fd647d5109b2',
                    sequenceAccountId: 'c9e249d8-5ac9-49af-b9a3-0da9f0946c3d',
                    name: 'Client',
                    scopes: ['product'],
                    pinnedApiVersion: '2024-01-01'
                  }
                ],
                pagination: {
                  after:
                    'ZTMwOWU5NDgtMDg4ZS00ZDc3LWI2NTQtY2Q4NTQ5OGYxNTU1IzE2NTgyNjA4NTYwMzMwMTMjREVTQw==',
                  before:
                    'NjRlZjJmZjktMmJjYi00M2RiLWI0ZDUtOTAxMDU4MjRiMTdmIzE2NTgyNjA3NTk3NTE2ODEjQVND',
                  totalResultSize: 100
                }
              },
              schema: {
                $ref: '#/components/schemas/ListOAuthClientsEndpointResponseModel'
              }
            }
          }
        },
        '500': {
          description: '',
          content: {}
        }
      },
      security: [],
      operationId: 'getApiOauth_clients',
      deprecated: false
    }

    const response = toOperationV3(
      operationInput,
      {
        path: '/oauth-clients',
        method: 'get',
        pathItem: { schematicType: 'pathItem' }
      },
      ctx
    )

    expect(response).toEqual(mockOasOperationWithParams)
  })

  it('should parse another operation', () => {
    const ctx = new ParseContext()

    const operationInput: OpenAPIV3.OperationObject = {
      summary: 'Get Metabase dashboard link',
      description:
        'Retrieve the Metabase link for the analytics dashboard of one of your [Sequence Accounts](/docs/organisations-and-accounts).',
      tags: [],
      parameters: [
        {
          schema: {
            type: 'string'
          },
          in: 'header',
          name: 'Authorization',
          required: true,
          description:
            'Your [API credentials](/docs/authentication). Eg. `Basic {credentials}`.'
        }
      ],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              example: {
                metabaseDashboardLink:
                  'https://sandbox.sequencehq.com/analytics/dashboard1'
              },
              schema: {
                $ref: '#/components/schemas/MetabaseDashboardLinkResponse'
              }
            }
          }
        },
        '500': {
          description: '',
          content: {}
        }
      },
      security: [],
      operationId: 'getApiAnalytics_dashboard_link',
      deprecated: false
    }

    const response = toOperationV3(
      operationInput,
      {
        path: '/analytics-dashboard-link',
        method: 'get',
        pathItem: { schematicType: 'pathItem' }
      },
      ctx
    )

    expect(response).toEqual(mockOasOperationThree)
  })
})

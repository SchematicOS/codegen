import { OasOperation } from 'engine/operation/types.ts'

export const mockOasOperation: OasOperation = {
  schematicType: 'operation',
  pathItem: {
    schematicType: 'pathItem'
  },
  path: '/pet',
  method: 'put',
  tags: ['pet'],
  summary: 'Update an existing pet',
  description: 'Update an existing pet by Id',
  requestBody: {
    schematicType: 'requestBody',
    description: 'Update an existent pet in the store',
    content: {
      'application/json': {
        schematicType: 'mediaType',
        mediaType: 'application/json',
        schema: {
          schematicType: 'ref',
          refType: 'schema',
          $ref: '#/components/schemas/Pet'
        }
      },
      'application/xml': {
        schematicType: 'mediaType',
        mediaType: 'application/xml',
        schema: {
          schematicType: 'ref',
          refType: 'schema',
          $ref: '#/components/schemas/Pet'
        }
      },
      'application/x-www-form-urlencoded': {
        schematicType: 'mediaType',
        mediaType: 'application/x-www-form-urlencoded',
        schema: {
          schematicType: 'ref',
          refType: 'schema',
          $ref: '#/components/schemas/Pet'
        }
      }
    },
    required: true
  },
  responses: {
    '200': {
      schematicType: 'response',
      description: 'Successful operation',
      content: {
        'application/xml': {
          schematicType: 'mediaType',
          mediaType: 'application/xml',
          schema: {
            schematicType: 'ref',
            refType: 'schema',
            $ref: '#/components/schemas/Pet'
          }
        },
        'application/json': {
          schematicType: 'mediaType',
          mediaType: 'application/json',
          schema: {
            schematicType: 'ref',
            refType: 'schema',
            $ref: '#/components/schemas/Pet'
          }
        }
      }
    },
    '400': {
      schematicType: 'response',
      description: 'Invalid ID supplied'
    },
    '404': {
      schematicType: 'response',
      description: 'Pet not found'
    },
    '405': {
      schematicType: 'response',
      description: 'Validation exception'
    }
  }
}

export const mockOasOperationThree: OasOperation = {
  deprecated: false,
  description:
    'Retrieve the Metabase link for the analytics dashboard of one of your [Sequence Accounts](/docs/organisations-and-accounts).',
  method: 'get',
  parameters: [
    {
      description:
        'Your [API credentials](/docs/authentication). Eg. `Basic {credentials}`.',
      location: 'header',
      name: 'Authorization',
      required: true,
      schema: {
        schematicType: 'schema',
        type: 'string'
      },
      schematicType: 'parameter'
    }
  ],
  path: '/analytics-dashboard-link',
  pathItem: {
    schematicType: 'pathItem'
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          examples: {
            'application/json': {
              schematicType: 'example',
              value: {
                metabaseDashboardLink:
                  'https://sandbox.sequencehq.com/analytics/dashboard1'
              }
            }
          },
          mediaType: 'application/json',
          schema: {
            $ref: '#/components/schemas/MetabaseDashboardLinkResponse',
            refType: 'schema',
            schematicType: 'ref'
          },
          schematicType: 'mediaType'
        }
      },
      description: 'OK',
      schematicType: 'response'
    },
    '500': {
      content: {},
      description: '',
      schematicType: 'response'
    }
  },
  schematicType: 'operation',
  summary: 'Get Metabase dashboard link',
  tags: []
}

export const mockOasOperationWithParams: OasOperation = {
  schematicType: 'operation',
  pathItem: {
    schematicType: 'pathItem'
  },
  path: '/oauth-clients',
  method: 'get',
  tags: [],
  summary: 'List OAuth Clients',
  description: 'List all OAuth clients for Sequence account',
  parameters: [
    {
      schematicType: 'parameter',
      name: 'limit',
      location: 'query',
      description: 'Maximum number of objects to return per-page.',
      required: false,
      schema: {
        schematicType: 'schema',
        type: 'integer'
      }
    },
    {
      schematicType: 'parameter',
      name: 'after',
      location: 'query',
      description:
        'Pagination offset. To page through items, omit this parameter to retrieve the first page, and then successively use the value you get from `pagination.after` or `pagination.before` to retrieve each page.',
      required: false,
      schema: {
        schematicType: 'schema',
        type: 'string'
      }
    },
    {
      schematicType: 'parameter',
      name: 'before',
      location: 'query',
      description:
        'Pagination offset. To page through items, omit this parameter to retrieve the first page, and then successively use the value you get from `pagination.next` or `pagination.previous` to retrieve each page.',
      required: false,
      schema: {
        schematicType: 'schema',
        type: 'string'
      }
    },
    {
      schematicType: 'parameter',
      name: 'Authorization',
      location: 'header',
      description:
        'Your [API credentials](/docs/authentication). Eg. `Basic {credentials}`.',
      required: true,
      schema: {
        schematicType: 'schema',
        type: 'string'
      }
    }
  ],
  responses: {
    '200': {
      schematicType: 'response',
      description: 'OK',
      content: {
        'application/json': {
          schematicType: 'mediaType',
          mediaType: 'application/json',
          schema: {
            schematicType: 'ref',
            refType: 'schema',
            $ref: '#/components/schemas/ListOAuthClientsEndpointResponseModel'
          },
          examples: {
            'application/json': {
              schematicType: 'example',
              value: {
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
              }
            }
          }
        }
      }
    },
    '500': {
      schematicType: 'response',
      description: '',
      content: {}
    }
  },
  deprecated: false
}

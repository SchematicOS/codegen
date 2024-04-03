import { OasResponse } from 'engine/response/types.ts'

export const mockOasResponse: OasResponse = {
  schematicType: 'response',
  description: 'successful operation',
  content: {
    'application/xml': {
      schematicType: 'mediaType',
      mediaType: 'application/xml',
      schema: {
        schematicType: 'schema',
        type: 'array',
        items: {
          schematicType: 'ref',
          refType: 'schema',
          $ref: '#/components/schemas/Pet'
        }
      }
    },
    'application/json': {
      schematicType: 'mediaType',
      mediaType: 'application/json',
      schema: {
        schematicType: 'schema',
        type: 'array',
        items: {
          schematicType: 'ref',
          refType: 'schema',
          $ref: '#/components/schemas/Pet'
        }
      }
    }
  }
}

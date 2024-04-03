import { describe, expect, it } from 'vitest'
// eslint-disable-next-line no-restricted-imports
import { OpenAPIV3 } from 'openapi-types'
import { mockOasResponse } from '@schematicos/types'
import { toResponseV3 } from '@/openApiV3/toResponseV3.ts'
import { ParseContext } from '@/ParseContext.ts'

describe('toResponseV3', () => {
  it('should parse a response', () => {
    const ctx = new ParseContext()

    const responseInput: OpenAPIV3.ResponseObject = {
      description: 'successful operation',
      content: {
        'application/xml': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Pet'
            }
          }
        },
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      }
    }

    const response = toResponseV3(responseInput, ctx)

    expect(response).toEqual(mockOasResponse)
  })
})

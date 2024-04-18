import { assertEquals } from 'assert'
import { toComponentsV3 } from './toComponentsV3.ts'
import { ParseContext } from 'parse/lib/ParseContext.ts'
import { mockComponents } from 'parse/openApiV3/components/mock.ts'
import { Trail } from 'parse/lib/Trail.ts'
import type { ComponentsFields } from 'parse/elements/Components.ts'

Deno.test('OpenAPI v3 components parse', () => {
  const components = toComponentsV3({
    components: mockComponents,
    trail: Trail.create(),
    context: ParseContext.create()
  })

  const expected: ComponentsFields = {
    examples: undefined,
    headers: undefined,
    models: {
      UpdateProjectRequest: {
        additionalProperties: undefined,
        properties: {
          description: {
            enums: undefined,
            format: undefined,
            pattern: undefined,
            schematicType: 'schema',
            type: 'string'
          },
          name: {
            enums: undefined,
            format: undefined,
            pattern: undefined,
            schematicType: 'schema',
            type: 'string'
          }
        },
        required: undefined,
        schematicType: 'schema',
        type: 'object'
      }
    }
  }

  assertEquals(components?.fields, expected)
})

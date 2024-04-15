import type { OasExample, OasExampleRef } from 'npm:@schematicos/types@0.0.34'
import type { ParseContextType } from '../lib/types.ts'
import type { ToExamplesV3Args } from './parseOpenApiV3.ts'
import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'

export const toExampleSimpleV3 = (example: unknown): OasExample | OasExampleRef => {
  return {
    schematicType: 'example',
    value: example
  }
}

export const toExamplesV3 = (
  { example, examples, exampleKey }: ToExamplesV3Args,
  ctx: ParseContextType
): Record<string, OasExample | OasExampleRef> | undefined => {
  if (example && examples) {
    ctx.unexpectedValue({
      section: 'OPENAPI_V3_EXAMPLES',
      message: `Both example and examples are defined for ${exampleKey}`
    })
  }

  if (example) {
    return {
      [exampleKey]: toExampleSimpleV3(example)
    }
  }

  if (examples) {
    return Object.fromEntries(
      Object.entries(examples).map(([key, value]) => {
        return [key, toExampleV3(value, ctx)]
      })
    )
  }

  return undefined
}

export const toExampleV3 = (
  examples: OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject,
  ctx: ParseContextType
): OasExample | OasExampleRef => {
  if (isRef(examples)) {
    return toRefV31(examples, 'example', ctx)
  }

  const { summary, description, value, ...skipped } = examples

  ctx.notImplemented({ section: 'OPENAPI_V3_EXAMPLE', skipped })

  return {
    schematicType: 'example',
    summary,
    description,
    value
  }
}

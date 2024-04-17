import type { OasExampleData, OasExampleRefData } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { OpenAPIV3 } from 'openapi-types'
import { isRef } from '../util/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Example } from 'parse/elements/Example.ts'

type ToExampleSimpleV3Args = {
  example: unknown
  trail: Trail
  context: ParseContext
}

export const toExampleSimpleV3 = ({
  example
}: ToExampleSimpleV3Args): OasExampleData | OasExampleRefData => {
  return {
    schematicType: 'example',
    value: example
  }
}

export type ToExamplesV3Args = {
  example: OpenAPIV3.ExampleObject | undefined
  examples:
    | Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>
    | undefined
  exampleKey: string
  trail: Trail
  context: ParseContext
}

export const toExamplesV3 = ({
  example,
  examples,
  exampleKey,
  trail,
  context
}: ToExamplesV3Args):
  | Record<string, OasExampleData | OasExampleRefData>
  | undefined => {
  if (example && examples) {
    context.unexpectedValue({
      trail,
      message: `Both example and examples are defined for ${exampleKey}`
    })
  }

  if (example) {
    return {
      [exampleKey]: toExampleSimpleV3({ example, trail, context })
    }
  }

  if (examples) {
    return Object.fromEntries(
      Object.entries(examples).map(([key, value]) => {
        return [
          key,
          toExampleV3({ example: value, trail: trail.add(key), context })
        ]
      })
    )
  }

  return undefined
}

type ToExampleV3Args = {
  example: OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject
  trail: Trail
  context: ParseContext
}

export const toExampleV3 = ({
  example,
  trail,
  context
}: ToExampleV3Args): OasExampleData | OasExampleRefData => {
  if (isRef(example)) {
    return toRefV31({ ref: example, refType: 'example', trail, context })
  }

  const { summary, description, value, ...skipped } = example

  const fields = stripUndefined({
    summary,
    description,
    value
  })

  return Example.create({ fields, trail, skipped, context })
}

import type { CoreContext } from '../context/CoreContext.ts'
import type { OpenAPIV3 } from 'openapi-types'
import { isRef } from '../helpers/isRef.ts'
import { toRefV31 } from './toRefV31.ts'
import type { Trail } from '../context/Trail.ts'
import { OasExample } from '../oas-elements/Example.ts'
import type { ExampleFields } from '../oas-elements/Example.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

type ToExampleSimpleV3Args = {
  example: unknown
  trail: Trail
  context: CoreContext
}

export const toExampleSimpleV3 = ({
  example,
  trail,
  context
}: ToExampleSimpleV3Args): OasExample | OasRef<'example'> => {
  const fields: ExampleFields = {
    value: example,
    summary: undefined,
    description: undefined
  }

  return OasExample.create({ fields, trail, skipped: {}, context })
}

export type ToExamplesV3Args = {
  example: OpenAPIV3.ExampleObject | undefined
  examples:
    | Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>
    | undefined
  exampleKey: string
  trail: Trail
  context: CoreContext
}

export const toExamplesV3 = ({
  example,
  examples,
  exampleKey,
  trail,
  context
}: ToExamplesV3Args):
  | Record<string, OasExample | OasRef<'example'>>
  | undefined => {
  if (example && examples) {
    context.warn({
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
  context: CoreContext
}

export const toExampleV3 = ({
  example,
  trail,
  context
}: ToExampleV3Args): OasExample | OasRef<'example'> => {
  if (isRef(example)) {
    return toRefV31({ ref: example, refType: 'example', trail, context })
  }

  const { summary, description, value, ...skipped } = example

  const fields: ExampleFields = {
    summary,
    description,
    value
  }

  return OasExample.create({ fields, trail, skipped, context })
}

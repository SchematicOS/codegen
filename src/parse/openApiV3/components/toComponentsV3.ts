import { toResponsesV3 } from '../toResponseV3.ts'
import { toHeadersV3 } from '../toHeadersV3.ts'
import { toSchemasV3 } from '../toSchemasV3.ts'
import { toParametersV3 } from '../toParameterV3.ts'
import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContext } from 'parse/lib/ParseContext.ts'
import { toExamplesV3 } from '../toExamplesV3.ts'
import { toRequestBodiesV3 } from '../toRequestBodiesV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Components } from 'parse/elements/Components.ts'

type ToComponentsV3Args = {
  components: OpenAPIV3.ComponentsObject | undefined
  trail: Trail
  context: ParseContext
}

export const toComponentsV3 = ({
  components,
  trail,
  context
}: ToComponentsV3Args): Components | undefined => {
  if (!components) {
    return undefined
  }
  const {
    schemas,
    responses,
    parameters,
    examples,
    requestBodies,
    headers,
    ...skipped
  } = components

  const fields = stripUndefined({
    models: schemas
      ? toSchemasV3({ schemas, trail: trail.add('schemas'), context })
      : undefined,
    responses: responses
      ? toResponsesV3({ responses, trail: trail.add('responses'), context })
      : undefined,
    parameters: parameters
      ? toParametersV3({
          parameters,
          trail: trail.add('parameters'),
          context
        })
      : undefined,
    examples: examples
      ? toExamplesV3({
          examples,
          example: undefined,
          exampleKey: 'TEMP',
          trail,
          context
        })
      : undefined,
    requestBodies: toRequestBodiesV3({
      requestBodies,
      trail: trail.add('requestBodies'),
      context
    }),
    headers: headers
      ? toHeadersV3({ headers, trail: trail.add('headers'), context })
      : undefined
  })

  return Components.create({ fields, trail, context, skipped })
}

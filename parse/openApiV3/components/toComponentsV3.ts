import { toOptionalResponsesV3 } from '../toResponseV3.ts'
import { toHeadersV3 } from '../toHeadersV3.ts'
import { toOptionalSchemasV3 } from '../toSchemasV3.ts'
import { toOptionalParametersV3 } from '../toParameterV3.ts'
import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from 'context/CoreContext.ts'
import { toExamplesV3 } from '../toExamplesV3.ts'
import { toRequestBodiesV3 } from '../toRequestBodiesV3.ts'
import type { Trail } from 'context/Trail.ts'
import { OasComponents } from 'parse/elements/Components.ts'
import type { ComponentsFields } from 'parse/elements/Components.ts'

type ToComponentsV3Args = {
  components: OpenAPIV3.ComponentsObject | undefined
  trail: Trail
  context: CoreContext
}

export const toComponentsV3 = ({
  components,
  trail,
  context
}: ToComponentsV3Args): OasComponents | undefined => {
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

  const fields: ComponentsFields = {
    schemas: toOptionalSchemasV3({
      schemas,
      trail: trail.add('schemas'),
      context
    }),
    responses: toOptionalResponsesV3({
      responses,
      trail: trail.add('responses'),
      context
    }),
    parameters: toOptionalParametersV3({
      parameters,
      trail: trail.add('parameters'),
      context
    }),
    examples: toExamplesV3({
      examples,
      example: undefined,
      exampleKey: 'TEMP',
      trail: trail.add('examples'),
      context
    }),
    requestBodies: toRequestBodiesV3({
      requestBodies,
      trail: trail.add('requestBodies'),
      context
    }),
    headers: toHeadersV3({ headers, trail: trail.add('headers'), context })
  }

  return OasComponents.create({ fields, trail, context, skipped })
}

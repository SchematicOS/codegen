import { toResponsesV3 } from './toResponseV3.ts'
import { toHeadersV3 } from './toHeaderV3.ts'
import { toSchemasV3 } from './toSchemasV3.ts'
import { toParametersV3 } from './toParameterV3.ts'
import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import type { ParseContextType } from '../lib/types.ts'
import type { OasComponents } from 'npm:@schematicos/types@0.0.34'
import { toExamplesV3 } from './toExamplesV3.ts'
import { toRequestBodiesV3 } from './toRequestBodiesV3.ts'

export const toComponentsV3 = (
  components: OpenAPIV3.ComponentsObject,
  ctx: ParseContextType
): OasComponents => {
  const {
    schemas,
    responses,
    parameters,
    examples,
    requestBodies,
    headers,
    ...skipped
  } = components

  ctx.notImplemented({ section: 'OPENAPI_V3_COMPONENTS', skipped })

  return {
    schematicType: 'components',
    models: schemas ? toSchemasV3(schemas, ctx) : undefined,
    responses: responses ? toResponsesV3(responses, ctx) : undefined,
    parameters: parameters ? toParametersV3(parameters, ctx) : undefined,
    examples: examples
      ? toExamplesV3({ examples, example: undefined, exampleKey: 'TEMP' }, ctx)
      : undefined,
    requestBodies: requestBodies
      ? toRequestBodiesV3(requestBodies, ctx)
      : undefined,
    headers: headers ? toHeadersV3(headers, ctx) : undefined
  }
}

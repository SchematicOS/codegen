import { toResponsesV3 } from './toResponseV3.ts'
import { toHeadersV3 } from './toHeaderV3.ts'
import { toSchemasV3 } from './toSchemasV3.ts'
import { toParametersV3 } from './toParameterV3.ts'
import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContextType } from '../lib/types.ts'
import type { OasComponents } from '@schematicos/types'
import { toExamplesV3 } from './toExamplesV3.ts'
import { toRequestBodiesV3 } from './toRequestBodiesV3.ts'

type ToComponentsV3Args = {
  components: OpenAPIV3.ComponentsObject
  path: string[]
  context: ParseContextType
}

export const toComponentsV3 = ({
  components,
  path,
  context
}: ToComponentsV3Args): OasComponents => {
  const {
    schemas,
    responses,
    parameters,
    examples,
    requestBodies,
    headers,
    ...skipped
  } = components

  context.notImplemented({ section: 'OPENAPI_V3_COMPONENTS', skipped })

  return {
    schematicType: 'components',
    models: schemas
      ? toSchemasV3({ schemas, path: path.concat('schemas'), context })
      : undefined,
    responses: responses
      ? toResponsesV3({ responses, path: path.concat('responses'), context })
      : undefined,
    parameters: parameters
      ? toParametersV3({ parameters, path: path.concat('parameters'), context })
      : undefined,
    examples: examples
      ? toExamplesV3(
          { examples, example: undefined, exampleKey: 'TEMP' },
          context
        )
      : undefined,
    requestBodies: requestBodies
      ? toRequestBodiesV3({
          requestBodies,
          path: path.concat('requestBodies'),
          context
        })
      : undefined,
    headers: headers
      ? toHeadersV3({ headers, path: path.concat('headers'), context })
      : undefined
  }
}

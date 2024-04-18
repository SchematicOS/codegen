import {
  SpecVersion,
  createConfig,
  stringifyYaml,
  BaseResolver,
  makeDocumentFromString,
  lintDocument,
  detectSpec
} from 'npm:@redocly/openapi-core@1.11.0'
import type {
  Config,
  NormalizedProblem,
  Source
} from 'npm:@redocly/openapi-core@1.11.0'
import { match } from 'ts-pattern'
import type { OpenAPIV3 } from 'openapi-types'
import type { ParsePayload } from '@schematicos/types'
import { toDocumentV3 } from '../openApiV3/parse.ts'
import { ParseContext } from './ParseContext.ts'
import { Trail } from 'parse/lib/Trail.ts'
import type { OasDocument } from 'parse/elements/Document.ts'

export const parseContent = async (
  payload: ParsePayload
): Promise<OasDocument> => {
  const context = ParseContext.create()

  const { document, specVersion } = await parseSchema(payload)

  return match(specVersion)
    .with(SpecVersion.OAS2, () => {
      context.notImplemented({
        trail: Trail.create(),
        message: 'OpenAPI v2 is not supported yet'
      })

      throw new Error('OpenAPI v2 is not supported yet')
    })
    .with(SpecVersion.OAS3_0, (): OasDocument => {
      return toDocumentV3({
        document: document.parsed as OpenAPIV3.Document,
        trail: Trail.create(),
        context
      })
    })
    .with(SpecVersion.OAS3_1, () => {
      context.notImplemented({
        trail: Trail.create(),
        message: 'OpenAPI v3.1 is not supported yet'
      })

      throw new Error('OpenAPI v3.1 is not supported yet')
    })
    .otherwise(() => {
      context.notImplemented({
        trail: Trail.create(),
        message: `Unsupported spec version: ${specVersion}`
      })

      throw new Error(`Unsupported spec version: ${specVersion}`)
    })
}

export const parseSchema = async (
  payload: ParsePayload
): Promise<{
  document: {
    source: Source
    parsed: unknown
  }
  specVersion: SpecVersion
  issues: NormalizedProblem[]
  summary: Record<string, number>
}> => {
  const config = await createConfig({
    extends: ['recommended']
  })

  const source = stringifyYaml(payload.schemaDocument)

  // you can also use JSON.stringify

  const { document, issues } = await lintFromString({
    source,
    // optionally pass path to the file for resolving $refs and proper error locations
    // absoluteRef: 'optional/path/to/openapi.yaml',
    config
  })

  const specVersion = detectSpec(document.parsed)

  const summary = issues.reduce<Record<string, number>>((acc, item) => {
    const thing = acc[item.severity]
    return {
      ...acc,
      [item.severity]: thing ? thing + 1 : 1
    }
  }, {})

  return { document, issues, specVersion, summary }
}

const lintFromString = async (opts: {
  source: string
  absoluteRef?: string
  config: Config
  externalRefResolver?: BaseResolver
}): Promise<{
  document: {
    source: Source
    parsed: unknown
  }
  issues: NormalizedProblem[]
}> => {
  const {
    source,
    absoluteRef,
    externalRefResolver = new BaseResolver(opts.config.resolve)
  } = opts
  const document = makeDocumentFromString(source, absoluteRef || '/')

  const issues = await lintDocument({
    document,
    ...opts,
    externalRefResolver,
    config: opts.config.styleguide
  })

  return { document, issues }
}

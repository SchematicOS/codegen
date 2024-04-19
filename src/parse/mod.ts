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
import { toDocumentV3 } from './openApiV3/parse.ts'
import { Trail } from 'core/lib/Trail.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'

export const parse = async (
  schemaDocument: string,
  context: CoreContext
): Promise<OasDocument> => {
  const { document, specVersion } = await parseSchema(schemaDocument)

  const trail = Trail.create({
    document: document.parsed as OpenAPIV3.Document
  })

  return match(specVersion)
    .with(SpecVersion.OAS2, () => {
      context.error({
        phase: 'parse',
        trail,
        message: 'OpenAPI v2 is not supported yet'
      })
    })
    .with(SpecVersion.OAS3_0, (): OasDocument => {
      return toDocumentV3({
        document: document.parsed as OpenAPIV3.Document,
        trail,
        context
      })
    })
    .with(SpecVersion.OAS3_1, () => {
      context.error({
        phase: 'parse',
        trail,
        message: 'OpenAPI v3.1 is not supported yet'
      })
    })
    .otherwise(() => {
      context.error({
        phase: 'parse',
        trail,
        message: `Unsupported spec version: ${specVersion}`
      })
    })
}

export const parseSchema = async (
  schemaDocument: string
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

  const source = stringifyYaml(schemaDocument)

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

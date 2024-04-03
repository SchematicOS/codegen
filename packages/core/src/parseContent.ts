import {
  SpecVersion,
  createConfig,
  stringifyYaml,
  Config,
  BaseResolver,
  makeDocumentFromString,
  lintDocument,
  detectSpec
} from '@redocly/openapi-core'
import { match } from 'ts-pattern'
import { OpenAPIV3 } from 'openapi-types'
import { OasRoot, ParsePayload } from '@schematicos/types'
import { fromDocumentV3 } from '@/openApiV3/parseOpenApiV3.ts'
import { ParseContext } from '@/ParseContext.ts'

export const parseContent = async (payload: ParsePayload): Promise<OasRoot> => {
  const ctx = new ParseContext()

  const { document, specVersion } = await parseSchema(payload)

  return match(specVersion)
    .with(SpecVersion.OAS2, () => {
      ctx.notImplemented({
        section: 'PARSE_SCHEMA',
        message: 'OpenAPI v2 is not supported yet'
      })

      throw new Error('OpenAPI v2 is not supported yet')
    })
    .with(SpecVersion.OAS3_0, (): OasRoot => {
      return fromDocumentV3(document.parsed as OpenAPIV3.Document, ctx)
    })
    .with(SpecVersion.OAS3_1, () => {
      ctx.notImplemented({
        section: 'PARSE_SCHEMA',
        message: 'OpenAPI v3.1 is not supported yet'
      })

      throw new Error('OpenAPI v3.1 is not supported yet')
    })
    .otherwise(() => {
      ctx.notImplemented({
        section: 'PARSE_SCHEMA',
        message: `Unsupported spec version: ${specVersion}`
      })

      throw new Error(`Unsupported spec version: ${specVersion}`)
    })
}

export const parseSchema = async (payload: ParsePayload) => {
  const config = await createConfig({
    extends: ['recommended']
  })

  const source = match(payload)
    .with({ schemaFormat: 'yaml' }, ({ schemaDocument }) => {
      return stringifyYaml(schemaDocument)
    })
    .with({ schemaFormat: 'json' }, ({ schemaDocument }) => schemaDocument)
    .exhaustive()

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
}) => {
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

import { OpenAPIV3 } from 'openapi-types'
import {
  parseContent,
  readFile
} from '@schematicos/parse'
import { generatePayload } from '@schematicos/types'
import { generateArtifacts } from '@schematicos/generate'
import { PrettierConfigType, SettingsConfigType } from '@schematicos/types'

type GenerateArgs = {
  source: string
  transformers: string[]
  typeSystem: string
  config: string
}

export const generate = async ({
  source,
  transformers,
  typeSystem,
  config
}: GenerateArgs) => {
  const openapiSchemaString = readFile<string>('./', source)
  const settingsConfig = readFile<SettingsConfigType>('./', config)

  if(!openapiSchemaString) {
    console.error(`Could not read schema from ${source}`)
    return
  }

  const schemaModel = await parseContent({
    schemaDocument: openapiSchemaString,
    schemaFormat: source.endsWith('.json') ? 'json' : 'yaml'
  })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const loadedTransformers = []
  
  for await (const transformer of transformers) {
    const transformerModule = await import(transformer)
    loadedTransformers.push(transformerModule)
  }

  const loadedTypeSystem = await import(typeSystem)




  




  console.log("Transformers", transformers, typeSystem);

  const artifactsMap = await generateArtifacts({
    schemaModel,
    settingsConfig,
    prettierConfig,
    transformers,
    typeSystem
  })

  console.log("Artifacts", artifactsMap)

  return ctx.json( artifactsMap )
}

const prettierConfig: PrettierConfigType = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid'
}
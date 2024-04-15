import { parseContent } from 'parse/lib/parseContent.ts'
import type { SettingsConfigType, PrettierConfigType } from '@schematicos/types'
import { generateArtifacts } from 'generate/lib/generateArtifacts.ts'
import { writeFile } from './writeFile.ts'
import generateModules from './transfomers.ts'
import { join } from 'path'

type GenerateArgs = {
  schema: string
  schemaFormat: 'json' | 'yaml'
  settingsConfig: SettingsConfigType
  prettierConfig: PrettierConfigType
}

export const generate = async ({
  schema,
  schemaFormat,
  settingsConfig,
  prettierConfig
}: GenerateArgs) => {
  

  const schemaModel = await parseContent({
    schemaDocument: schema,
    schemaFormat
  })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const artifactsMap = await generateArtifacts({
    schemaModel,
    settingsConfig,
    prettierConfig,
    ...generateModules
  })

  Object.entries(artifactsMap).forEach(([filePath, content]) => {
    console.log('FILEPATH', filePath)

    const resolvedPath = join('./.generated', filePath)

    writeFile({
      content,
      resolvedPath
    })
  })
}




import { parseContent } from 'jsr:@schematicos/parse@0.0.2/parseContent'
import { SettingsConfigType } from 'npm:@schematicos/types@0.0.34'
import { generateArtifacts } from 'jsr:@schematicos/generate@0.0.14/generateArtifacts'
import { writeFile } from './writeFile.ts'
import generateModules from './transfomers.ts'
import { join } from 'jsr:@std/path@0.222.1'
import { PrettierConfigType } from "npm:@schematicos/types@0.0.34";

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




import { parseContent } from 'parse/lib/parseContent.ts'
import type { SettingsType, PrettierConfigType } from '@schematicos/types'
import { generate } from 'generate/mod.ts'
import { writeFile } from './writeFile.ts'
import generateModules from './transfomers.ts'
import { join } from 'path'

type RunArgs = {
  schema: string
  schemaFormat: 'json' | 'yaml'
  settingsConfig?: SettingsType
  prettierConfig?: PrettierConfigType
}

export const run = async ({
  schema,
  schemaFormat,
  settingsConfig,
  prettierConfig
}: RunArgs) => {
  const schemaModel = await parseContent({
    schemaDocument: schema,
    schemaFormat
  })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const artifactsMap = await generate({
    schemaModel,
    settingsConfig,
    prettierConfig,
    ...generateModules
  })

  Object.entries(artifactsMap).forEach(([filePath, content]) => {
    console.log('FILEPATH', filePath)

    const resolvedPath = join('./.generated/deno-subhosting', filePath)

    writeFile({
      content,
      resolvedPath
    })
  })
}

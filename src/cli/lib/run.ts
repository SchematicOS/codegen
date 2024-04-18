import { parse } from 'parse/mod.ts'
import type { SettingsType, PrettierConfigType } from '@schematicos/types'
import { generate } from 'generate/mod.ts'
import { writeFile } from './writeFile.ts'
import generateModules from './transfomers.ts'
import { join } from 'path'
import type { OasDocument } from 'parse/elements/Document.ts'
import { Reporter } from 'core/lib/Reporter.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'
import { LogStore } from 'core/lib/LogStore.ts'

type RunArgs = {
  schema: string
  project: string
  schemaFormat: 'json' | 'yaml'
  settings?: SettingsType
  prettier?: PrettierConfigType
}

export const run = async ({
  schema,
  project,
  schemaFormat,
  settings,
  prettier
}: RunArgs) => {
  const logStore = new LogStore()

  const reporter = Reporter.create({
    logLevel: 'info',
    destination: (log: ReportArgs) => logStore.addLog(log)
  })

  const schemaModel: OasDocument = await parse({
    schemaDocument: schema,
    schemaFormat,
    reporter
  })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const { transformers, typeSystem } = generateModules

  const artifactsMap = await generate({
    schemaModel,
    settings,
    prettier,
    reporter,
    transformers,
    typeSystem
  })

  Object.entries(artifactsMap).forEach(([filePath, content]) => {
    const resolvedPath = join('./.schematic', project, 'output', filePath)

    writeFile({
      content,
      resolvedPath
    })
  })

  const { logs, operations } = logStore.generateOutput()

  writeFile({
    content: logs,
    resolvedPath: join('./.schematic', project, 'logs', 'logs.txt')
  })

  writeFile({
    content: operations,
    resolvedPath: join('./.schematic', project, 'logs', 'operations.txt')
  })
}

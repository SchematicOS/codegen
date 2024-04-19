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
import { ParseContext } from 'core/lib/ParseContext.ts'
import { CoreContext } from 'core/lib/CoreContext.ts'
import { Settings } from 'generate/settings/Settings.ts'

type RunArgs = {
  schema: string
  project: string
  settings?: SettingsType
  prettier?: PrettierConfigType
}

export const run = async ({
  schema,
  project,
  settings = {},
  prettier
}: RunArgs) => {
  const logStore = new LogStore()

  const reporter = Reporter.create({
    logLevel: 'info',
    destination: (log: ReportArgs) => logStore.addLog(log)
  })

  const parseContext = ParseContext.create({ reporter })

  const context = CoreContext.create({
    phase: { type: 'parse', context: parseContext },
    reporter
  })

  const schemaModel: OasDocument = await parse(schema, context)

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const { transformers, typeSystem } = generateModules

  context.setupGeneratePhase({
    schemaModel,
    settings: Settings.create(settings),
    typeSystem
  })

  generate({ schemaModel, transformers, context })

  context.setupRenderPhase({
    files: context.files,
    prettier
  })

  const artifactsMap = await context.render()

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

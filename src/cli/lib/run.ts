import { parse } from 'parse/mod.ts'
import type { SettingsType, PrettierConfigType } from '@schematicos/types'
import { writeFile } from './writeFile.ts'
import { join } from 'path'
import type { OasDocument } from 'parse/elements/Document.ts'
import { Reporter } from 'core/lib/Reporter.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'
import { LogStore } from 'core/lib/LogStore.ts'
import { ParseContext } from 'core/lib/ParseContext.ts'
import { CoreContext } from 'core/lib/CoreContext.ts'
import { Settings } from 'generate/settings/Settings.ts'
import { Trail } from 'core/lib/Trail.ts'
import type { Transformer } from 'generate/types.ts'
import { generate } from 'generate/mod.ts'

export type GenerateConfig = {
  transformers: string[]
  typeSystem: string
}

type RunArgs = {
  schema: string
  project: string
  settings: SettingsType
  prettier?: PrettierConfigType
}

export const run = async ({ schema, project, settings, prettier }: RunArgs) => {
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

  context.info({
    trail: Trail.create(),
    message: 'Begin parsing phase'
  })

  const schemaModel: OasDocument = await parse(schema, context)

  context.info({
    trail: Trail.create(),
    message: 'Parsing phase complete'
  })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  const t: { default: Transformer }[] = await Promise.all(
    settings.transformerModules.map(transformer => import(transformer))
  )

  const transformers = t.map(({ default: d }) => d)

  const { default: typeSystem } = await import(settings.typeSystemModule)

  context.setupGeneratePhase({
    schemaModel,
    settings: Settings.create(settings),
    typeSystem
  })

  context.info({
    trail: Trail.create(),
    message: 'Begin generate phase'
  })

  generate({ schemaModel, transformers, context })

  context.info({
    trail: Trail.create(),
    message: 'Generate phase complete'
  })

  context.info({
    trail: Trail.create(),
    message: 'Begin render phase'
  })

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

  context.info({
    trail: Trail.create(),
    message: 'Render phase complete'
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

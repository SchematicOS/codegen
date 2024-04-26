import { parse } from '../parse/mod.ts'
import type { SettingsType } from '../schematic-types/settings.ts'
import type { PrettierConfigType } from '../schematic-types/prettierConfig.ts'
import { writeFile } from './file.ts'
import { join } from '@std/path'
import type { OasDocument } from '../oas-elements/Document.ts'
import { Reporter } from '../context/Reporter.ts'
import type { ReportArgs } from '../context/Reporter.ts'
import { LogStore } from '../context/LogStore.ts'
import { ParseContext } from '../context/ParseContext.ts'
import { CoreContext } from '../context/CoreContext.ts'
import { Settings } from '../settings/Settings.ts'
import { Trail } from '../context/Trail.ts'
import type { Transformer, TypeSystem } from '../generate/types.ts'
import { generate } from '../generate/mod.ts'

type RunArgs = {
  schema: string
  project: string
  settings?: SettingsType
  prettier?: PrettierConfigType
  transformers: Transformer[]
  typeSystem: TypeSystem
}

export const run = async ({
  schema,
  project,
  settings = {},
  prettier,
  transformers,
  typeSystem
}: RunArgs) => {
  const trail = Trail.create()

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

  context.info({ trail, message: 'Begin parsing phase' })

  const schemaModel: OasDocument = await parse(schema, context)

  context.info({ trail, message: 'Parsing phase complete' })

  if (!schemaModel.openapi.startsWith('3.0.')) {
    throw new Error('Only OpenAPI v3 is supported')
  }

  context.setupGeneratePhase({
    schemaModel,
    settings: Settings.create(settings),
    typeSystem
  })

  context.info({ trail, message: 'Begin generate phase' })

  generate({ schemaModel, transformers, context })

  context.info({ trail, message: 'Generate phase complete' })

  context.info({ trail, message: 'Begin render phase' })

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

  context.info({ trail, message: 'Render phase complete' })

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

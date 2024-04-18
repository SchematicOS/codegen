import { parse } from 'parse/mod.ts'
import type { SettingsType, PrettierConfigType } from '@schematicos/types'
import { generate } from 'generate/mod.ts'
import { writeFile } from './writeFile.ts'
import generateModules from './transfomers.ts'
import { join } from 'path'
import type { OasDocument } from 'parse/elements/Document.ts'
import { Reporter } from 'core/lib/Reporter.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'

type RunArgs = {
  schema: string
  project: string
  schemaFormat: 'json' | 'yaml'
  settingsConfig?: SettingsType
  prettierConfig?: PrettierConfigType
}

export const run = async ({
  schema,
  project,
  schemaFormat,
  settingsConfig,
  prettierConfig
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
    settingsConfig,
    prettierConfig,
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

  const { logs, operations } = logStore.getLogs()

  writeFile({
    content: logs.join('\n'),
    resolvedPath: join('./.schematic', project, 'logs', 'logs.txt')
  })

  writeFile({
    content: Object.entries(operations).reduce((acc, [operation, logs]) => {
      acc += `${operation}\n${logs.join('\n')}\n\n`
      return acc
    }, ''),
    resolvedPath: join('./.schematic', project, 'logs', 'operations.txt')
  })
}

class LogStore {
  logs: string[] = []
  operations: Record<string, string[]> = {}

  addLog({ level, phase, trail, message }: ReportArgs) {
    const fullLog = `${level
      .toUpperCase()
      .padEnd(6)} [${phase.toUpperCase()}]  ${trail.toString()} - ${message}`

    this.logs.push(fullLog)

    const { apiPath, method } = trail

    if (apiPath && method) {
      const operationId = `${trail.method?.toUpperCase()} ${trail.apiPath}`

      if (!this.operations[operationId]) {
        this.operations[operationId] = []
      }

      const subMethodPath = `${trail.toSubMethodTrail().toString()}`

      const pathAndMessage = subMethodPath
        ? `${subMethodPath} - ${message}`
        : message

      const subMethodLog = `${level
        .toUpperCase()
        .padEnd(6)} [${phase.toUpperCase()}]  ${pathAndMessage}`

      this.operations[operationId].push(subMethodLog)
    }
  }

  getLogs() {
    return {
      logs: this.logs,
      operations: this.operations
    }
  }
}

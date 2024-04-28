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
import type { Transformer, TypeSystem } from '../schematic-types/plugins.ts'
import { ensureFileSync } from '@std/fs'
import { Identifier } from '../dsl/Identifier.ts'
import { Definition } from '../dsl/Definition.ts'

type RunArgs = {
  schema: string
  schemaName: string
  settings?: SettingsType
  prettier?: PrettierConfigType
  transformers: Transformer[]
  typeSystem: TypeSystem
  packageJson: boolean
}

export const run = async ({
  schema,
  schemaName,
  settings = {},
  prettier,
  transformers,
  typeSystem,
  packageJson
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

  const artifactsMap = await context.render({ packageJson })

  Object.entries(artifactsMap).forEach(([filePath, content]) => {
    const resolvedPath = join(schemaName, filePath)

    ensureFileSync(resolvedPath)

    writeFile({
      content,
      resolvedPath
    })
  })

  context.info({ trail, message: 'Render phase complete' })

  const { logs, operations } = logStore.generateOutput()

  writeFile({
    content: logs,
    resolvedPath: join('./.schematic', schemaName, 'logs', 'logs.txt')
  })

  writeFile({
    content: operations,
    resolvedPath: join('./.schematic', schemaName, 'logs', 'operations.txt')
  })
}

type GenerateArgs = {
  schemaModel: OasDocument
  transformers: Transformer[]
  context: CoreContext
}

export const generate = ({
  schemaModel,
  transformers,
  context
}: GenerateArgs) => {
  transformers.forEach(({ id, transform }) => {
    console.log(id)

    const transformerSettings = context.settings.getTransformerSettings(id)
    transform({ context, transformerSettings })

    console.log('')
  })

  Object.entries(schemaModel.components?.schemas ?? {})
    .map(([$ref, value]) => {
      const identifier = Identifier.from$Ref({ $ref, context })

      return { value, identifier }
    })
    .filter(({ identifier }) => identifier.modelSettings.isSelected())
    .forEach(({ value, identifier }) => {
      const definition = Definition.fromValue({
        context,
        value,
        identifier,
        description: value.description,
        destinationPath: identifier.modelSettings.getExportPath()
      })

      context.register({
        definitions: [definition],
        destinationPath: definition.destinationPath
      })
    })
}

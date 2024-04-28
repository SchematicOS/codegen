import { Command } from '@cliffy/command'
import { run } from './run.ts'
import { readFile } from './file.ts'
import type { TypeSystem, Transformer } from '../schematic-types/plugins.ts'
import { resolve, join } from '@std/path'
import type { PrettierConfigType } from '../schematic-types/prettierConfig.ts'
import type { SettingsType } from '../schematic-types/settings.ts'

type MainArgs = {
  schemaName: string
  transformers: string[]
  typeSystem: string
  packageJson: boolean
}

const toImportSource = (module: string) => {
  return module.startsWith('jsr:')
    ? module
    : `file://${join(Deno.cwd(), module)}`
}

const main = async ({
  schemaName,
  transformers,
  typeSystem,
  packageJson
}: MainArgs) => {
  const schemaPath = resolve('./.schematic', schemaName, 'schema.json')

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    return console.error(`Could not read schema from "${schemaPath}"`)
  }

  const config = join('./.schematic', schemaName, 'config')

  const settingsPath = resolve(config, 'settings.json')

  const settings = readFile<SettingsType>(settingsPath)

  const prettierPath = resolve('./.schematic', 'prettier.json')

  const prettier = readFile<PrettierConfigType>(prettierPath)

  const t: Transformer[] = await Promise.all(
    transformers.map(async transformer => {
      const transformerSource = toImportSource(transformer)

      const imported = await import(transformerSource)

      return {
        id: transformer,
        transform: imported.default
      }
    })
  )

  const typeSystemSource = toImportSource(typeSystem)

  const ts: { default: TypeSystem } = await import(typeSystemSource)

  run({
    schema: schemaContent,
    schemaName,
    settings,
    prettier,
    transformers: t,
    typeSystem: ts.default,
    packageJson
  })
}

const defaultSchemaName = 'petstore'

export const toGenerateCommand = () => {
  return new Command()
    .description('Generate code from OpenAPI schema')
    .option('-n --name [schemaName:string]', 'Project name of source schema', {
      default: defaultSchemaName
    })
    .option(
      '-t --transformers <modules...:string>',
      'List of transformers to use',
      { required: true }
    )
    .option('-s --typeSystem [module:string]', 'Type system to use', {
      default: 'jsr:@schematicos/codegen/zod'
    })
    .option('-j --packageJson', 'Create package.json for external dependencies')
    .example(
      'Generate MUI forms with RTK Query api client using Zod types',
      'generate -t jsr:@schematicos/codegen/rtk-query jsr:@schematicos/codegen/mui-joy-forms -s jsr:@schematicos/codegen/zod'
    )
    .action(
      ({ name: schemaName, transformers, typeSystem, packageJson = false }) => {
        if (
          typeof schemaName === 'string' &&
          Array.isArray(transformers) &&
          typeof typeSystem === 'string'
        ) {
          console.log({ schemaName, transformers, typeSystem })

          main({
            schemaName,
            transformers,
            typeSystem,
            packageJson: schemaName === defaultSchemaName || packageJson
          })
        }
      }
    )
}

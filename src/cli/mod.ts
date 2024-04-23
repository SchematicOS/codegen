import { Command } from '@cliffy/command'
import { run } from './lib/run.ts'
import { join, resolve } from 'path'
import { readFile } from './lib/readFile.ts'
import type { PrettierConfigType, SettingsType } from '@schematicos/types'
import { dynamicImport } from 'https://deno.land/x/import@0.2.1/mod.ts'
import type { TypeSystem, Transformer } from 'generate/types.ts'

type MainArgs = {
  project: string
  transformers: string[]
  typeSystem: string
}

const main = async ({ project, transformers, typeSystem }: MainArgs) => {
  const schemaPath = resolve('./.schematic', project, 'schema.json')

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    console.error(`Could not read schema from "${schemaPath}"`)
    return
  }

  const config = join('./.schematic', project, 'config')

  const settingsPath = resolve(config, 'settings.json')

  const settings = readFile<SettingsType>(settingsPath)

  if (!settings) {
    console.error(`Could not read schema from "${settingsPath}"`)
    return
  }

  const prettierPath = resolve(config, 'prettier.json')

  const prettier = readFile<PrettierConfigType>(prettierPath)

  const ts: { default: TypeSystem } = await dynamicImport(typeSystem)

  console.log('Type system : ', ts)

  const t: Transformer[] = await Promise.all(
    transformers.map(async transformer => {
      const module = await dynamicImport(transformer)

      console.log('Transformer : ', module)

      return module.default
    })
  )

  run({
    schema: schemaContent,
    project: project,
    settings,
    prettier,
    transformers: t,
    typeSystem: ts.default
  })
}

await new Command()
  .version('0.0.1')
  .command('generate', 'Generate code from OpenAPI schema')
  .option(
    '-p --project [project:string]',
    'Which project to generate schemas for',
    { required: true, default: 'petstore' }
  )
  .option(
    '-t --transformers [modules...:string]',
    'List of transformers to use',
    { required: true }
  )
  .option('-ts --typeSystem [module:string]', 'Type system to use', {
    default: 'jsr:@schematicos/zod'
  })
  .example(
    'Generate MUI forms with RTK Query api client using Zod types',
    'generate -t jsr:@schematicos/rtk-query jsr:@schematicos/mui-joy-forms -ts jsr:@schematicos/zod'
  )
  .action(({ project, transformers, typeSystem }) => {
    if (
      typeof project === 'string' &&
      Array.isArray(transformers) &&
      typeof typeSystem === 'string'
    ) {
      main({ project, transformers, typeSystem })
    }
  })
  .parse(Deno.args)

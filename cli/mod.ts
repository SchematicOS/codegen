import { Command } from '@cliffy/command'
import { run } from './lib/run.ts'
import { readFile } from './lib/file.ts'
import type { PrettierConfigType, SettingsType } from '@schematicos/types'
import type { TypeSystem, Transformer } from 'generate/types.ts'
import { deno } from './denoJsonImport.ts'
import { resolve, join } from 'path'
import { promptCloneTransformer, promptNewSchema } from './lib/prompt.ts'
import { toImportSource } from './lib/util.ts'

type MainArgs = {
  project: string
  transformers: string[]
  typeSystem: string
}

const main = async ({ project, transformers, typeSystem }: MainArgs) => {
  const schemaPath = resolve('./.schematic', project, 'schema.json')

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    return console.error(`Could not read schema from "${schemaPath}"`)
  }

  const config = join('./.schematic', project, 'config')

  const settingsPath = resolve(config, 'settings.json')

  const settings = readFile<SettingsType>(settingsPath)

  if (!settings) {
    return console.error(`Could not read schema from "${settingsPath}"`)
  }

  const prettierPath = resolve(config, 'prettier.json')

  const prettier = readFile<PrettierConfigType>(prettierPath)

  const typeSystemSource = toImportSource(typeSystem)

  const ts: { default: TypeSystem } = await import(typeSystemSource)

  const t: Transformer[] = await Promise.all(
    transformers.map(async transformer => {
      const transformerSource = toImportSource(transformer)

      const module = await import(transformerSource)

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
  .version(`${deno.version}`)
  .command('generate', 'Generate code from OpenAPI schema')
  .option(
    '-p --project [project:string]',
    'Which project to generate schemas for',
    { required: true, default: 'petstore' }
  )
  .option(
    '-t --transformers <modules...:string>',
    'List of transformers to use',
    { required: true }
  )
  .option('-s --typeSystem [module:string]', 'Type system to use', {
    default: '@schematicos/codegen/zod'
  })
  .example(
    'Generate MUI forms with RTK Query api client using Zod types',
    'generate -t jsr:@schematicos/codegen/rtk-query jsr:@schematicos/codegen/mui-joy-forms -s jsr:@schematicos/codegen/zod'
  )
  .action(({ project, transformers, typeSystem }) => {
    if (
      typeof project === 'string' &&
      Array.isArray(transformers) &&
      typeof typeSystem === 'string'
    ) {
      console.log({ project, transformers, typeSystem })

      main({ project, transformers, typeSystem })
    }
  })
  .command('init', 'Initialize a new project in current directory')
  .action(async _options => {
    const actions = [await promptNewSchema(), await promptCloneTransformer()]

    actions.forEach(async action => await action?.())
  })
  .parse(Deno.args)

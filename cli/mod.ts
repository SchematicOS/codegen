import { Command } from '@cliffy/command'
import { run } from './run.ts'
import { readFile } from './file.ts'
import type { TypeSystem, Transformer } from '../generate/types.ts'
import { deno } from './denoJsonImport.ts'
import { resolve, join } from '@std/path'
import { promptCloneTransformer, promptNewSchema } from './prompt.ts'
import type { PrettierConfigType } from '../schematicTypes/prettierConfig.ts'
import type { SettingsType } from '../schematicTypes/settings.ts'

type MainArgs = {
  project: string
  transformers: string[]
  typeSystem: string
}

const toImportSource = (module: string) => {
  return module.startsWith('jsr:')
    ? module
    : `file://${join(Deno.cwd(), module)}`
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

  const prettierPath = resolve(config, 'prettier.json')

  const prettier = readFile<PrettierConfigType>(prettierPath)

  console.log('META URL', import.meta.url)

  const t: Transformer[] = await Promise.all(
    transformers.map(async transformer => {
      const transformerSource = toImportSource(transformer)

      console.log('IMPORTING TRANSFORMER', transformerSource)

      const imported = await import(transformerSource)

      console.log('IMPORTED TRANSFORMER', imported)

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

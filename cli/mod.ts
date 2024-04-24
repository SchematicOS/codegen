import { Command } from '@cliffy/command'
import { run } from './lib/run.ts'
import { join, resolve } from 'path'
import { readFile } from './lib/readFile.ts'
import type { PrettierConfigType, SettingsType } from '@schematicos/types'
import type { TypeSystem, Transformer } from 'generate/types.ts'
import { Confirm, Input } from '@cliffy/prompt'
import { ensureFile } from 'fs'

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

  const ts: { default: TypeSystem } = await import(typeSystem)

  const t: Transformer[] = await Promise.all(
    transformers.map(async transformer => {
      const module = await import(transformer)

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

const downloadPackage = async (name: string) => {
  const res = await fetch(`https://jsr.io/${name}/meta.json`)
  const data = await res.json()

  console.log('DATA', data)

  const url2 = `https://jsr.io/${name}/${data.latest}_meta.json`

  console.log('URL2', url2)

  const res2 = await fetch(url2)
  const data2 = await res2.json()

  const files = Object.keys(data2.manifest).map(async key => {
    const res3 = await fetch(`https://jsr.io/${name}/${data.latest}/${key}`)
    const data3 = await res3.text()

    return [key, data3] as [string, string]
  })

  return await Promise.all(files)
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
    '-t --transformers <modules...:string>',
    'List of transformers to use',
    { required: true }
  )
  .option('-s --typeSystem [module:string]', 'Type system to use', {
    default: 'jsr:@schematicos/codegen/zod'
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
      main({ project, transformers, typeSystem })
    }
  })
  .command('init', 'Initialize a new project in current directory')
  .action(async _options => {
    const newSchema = await Confirm.prompt({ message: 'Add new schema?' })

    if (newSchema) {
      const url = await Input.prompt({
        message: 'Enter the URL of the schema',
        suggestions: ['https://petstore3.swagger.io/api/v3/openapi.json']
      })

      const name = await Input.prompt({
        message: 'Enter the name of the schema',
        suggestions: ['petstore']
      })

      const fileName = new URL(url).pathname.split('/').pop()

      const fileType = fileName?.endsWith('.json')
        ? 'json'
        : fileName?.endsWith('.yaml') || fileName?.endsWith('.yml')
        ? 'yaml'
        : undefined

      if (!fileType) {
        throw new Error(`File type is not JSON or YAML: ${fileName}`)
      }

      const projectPath = join('./.schematic', name)

      Deno.mkdirSync(projectPath, { recursive: true })

      const res = await fetch(url)

      const schema = await res.text()

      Deno.writeTextFileSync(join(projectPath, `schema.${fileType}`), schema)
    }

    const cloneTransformer = await Confirm.prompt({
      message: 'Clone existing transformer for editing?'
    })

    if (cloneTransformer) {
      const transformer = await Input.prompt({
        message: 'Enter the name of the transformer to clone',
        suggestions: ['@schematicos/rtk-query']
      })

      const entries = await downloadPackage(transformer)

      const [_a, transformerName] = transformer.split('/')

      entries.forEach(async ([path, content]) => {
        const joinedPath = join('./transformers', transformerName, path)
        await ensureFile(joinedPath)
        Deno.writeTextFileSync(joinedPath, content)
      })
    }
  })
  .parse(Deno.args)

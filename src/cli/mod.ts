import { parseArgs } from 'cli/parse-args'
import { run } from './lib/run.ts'
import { join, resolve } from 'path'
import { readFile } from './lib/readFile.ts'
import type { PrettierConfigType, SettingsType } from '@schematicos/types'

const parseArguments = (args: string[]) => {
  const parsedArgs = parseArgs(args, {
    boolean: ['help'],
    string: ['schema', 'settings', 'prettier', 'project'],
    alias: {
      help: 'h',
      schema: 's',
      settings: 't',
      prettier: 'f',
      project: 'p'
    },
    default: {
      schema: 'schema.json',
      settings: 'settings.json',
      prettier: 'prettier.json',
      project: '.schematic'
    },
    stopEarly: false,
    '--': true
  })

  return parsedArgs
}

function printHelp(): void {
  console.log(`Usage: generate [OPTIONS...]`)
  console.log('\nOptional flags:')
  console.log(
    "  -s, --schema              Path to OpenAPI schema file. Defaults to 'schema.json'"
  )
  console.log(
    "  -t, --settings            Path to settings file. Defaults to 'settings.json'"
  )
  console.log(
    "  -f, --prettier            Path to prettier config file. Defaults to 'prettier.json'"
  )
  console.log(
    "  -p, --project           Directory in './.schematic' containing schema and settings files. Defaults to 'petstore'"
  )
  console.log('  -h, --help                Display this help and exit')
}

const main = (inputArgs: string[]) => {
  const { help, project, schema, settings, prettier } =
    parseArguments(inputArgs)

  // If help flag enabled, print help.
  if (help) {
    printHelp()
    Deno.exit(0)
  }

  const schemaFormat = schema.endsWith('.json') ? 'json' : 'yaml'

  const directory = join('./.schematic', project, 'config')

  const schemaPath = resolve(directory, schema)

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    console.error(`Could not read schema from "${schemaPath}"`)
    return
  }

  const settingsPath = resolve(directory, settings)

  const settingsConfig = readFile<SettingsType>(settingsPath)

  const prettierPath = resolve(directory, prettier)

  const prettierConfig = readFile<PrettierConfigType>(prettierPath)

  run({
    schema: schemaContent,
    project,
    schemaFormat,
    settingsConfig,
    prettierConfig
  })
}

main(Deno.args)

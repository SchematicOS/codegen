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
  const args = parseArguments(inputArgs)

  // If help flag enabled, print help.
  if (args.help) {
    printHelp()
    Deno.exit(0)
  }

  const schemaPath = resolve('./.schematic', args.project, args.schema)

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    console.error(`Could not read schema from "${schemaPath}"`)
    return
  }

  const config = join('./.schematic', args.project, 'config')

  const settingsPath = resolve(config, args.settings)

  const settings = readFile<SettingsType>(settingsPath)

  if (!settings) {
    console.error(`Could not read schema from "${settingsPath}"`)
    return
  }

  const prettierPath = resolve(config, args.prettier)

  const prettier = readFile<PrettierConfigType>(prettierPath)

  run({
    schema: schemaContent,
    project: args.project,
    settings,
    prettier
  })
}

main(Deno.args)

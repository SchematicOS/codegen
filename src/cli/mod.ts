import { parseArgs } from "cli/parse-args";
import { generate } from './lib/generate.ts'
import { join } from 'path'
import { readFile } from "./lib/readFile.ts";
import type { PrettierConfigType, SettingsConfigType } from "@schematicos/types";

const parseArguments = (args: string[]) => {
  const parsedArgs = parseArgs(args, {
    boolean: ['help'],
    string: ['schema', 'settings', 'prettier', 'directory'],
    alias: {
      help: 'h',
      schema: 's',
      settings: 't',
      prettier: 'p',
      directory: 'd'
    },
    default: {
      schema: './schema.json',
      settings: './settings.json',
      prettier: './prettier.json',
      directory: './.schematic'
    },
    stopEarly: false,
    "--": true,
  })

  return parsedArgs
}

function printHelp(): void {
  console.log(`Usage: generate [OPTIONS...]`);
  console.log("\nOptional flags:");
  console.log("  -s, --schema              Path to OpenAPI schema file. Defaults to 'schema.json'");
  console.log("  -t, --settings            Path to settings file. Defaults to 'settings.json'");
  console.log("  -p, --prettier            Path to prettier config file. Defaults to 'prettier.json'");
  console.log("  -d, --directory           Directory containing schema and settings files. Defaults to './.schematic'");
  console.log("  -h, --help                Display this help and exit");
}

const main = (inputArgs: string[]) => {
  const {help, directory, schema, settings, prettier} = parseArguments(inputArgs)

  // If help flag enabled, print help.
  if (help) {
    printHelp();
    Deno.exit(0);
  }

  const schemaFormat = schema.endsWith('.json') ? 'json' : 'yaml'

  const schemaPath = join(directory, schema)

  const schemaContent = readFile<string>(schemaPath)

  if (!schemaContent) {
    console.error(`Could not read schema from "${schema}"`)
    return
  }

  const settingsPath = join(directory, settings)

  const settingsConfig = readFile<SettingsConfigType>(settingsPath)

  if (!settingsConfig) {
    console.error(`Could not read settings from "${settings}"`)
    return
  }

  const prettierPath = join(directory, prettier)

  const prettierConfig = readFile<PrettierConfigType>(prettierPath)

  if (!prettierConfig) {
    console.error(`Could not read prettier config from "${prettier}"`)
    return
  }

  generate({
    schema: schemaContent,
    schemaFormat,
    settingsConfig,
    prettierConfig
  })
}

main(Deno.args)

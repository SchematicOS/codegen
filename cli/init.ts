import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './downloads.ts'
import { ensureDirSync } from '@std/fs'
import { join } from '@std/path'
import { writeFile } from './file.ts'
import { DEFAULT_NAME, DEFAULT_SCHEMA_URL } from './constants.ts'
import { Toggle } from '@cliffy/prompt'

type CreateProjectFolderOptions = {
  logSuccess?: boolean
}

export const createProjectFolder = ({
  logSuccess
}: CreateProjectFolderOptions) => {
  ensureDirSync(join(Deno.cwd(), '.schematic'))

  writeFile({
    content: prettierConfig,
    resolvedPath: join(Deno.cwd(), '.schematic', 'prettier.json')
  })

  if (logSuccess) {
    console.log('Created new project folder')
  }
}

type InitialiseDemoSchemaOptions = {
  logSuccess?: boolean
}

export const initialiseDemoSchema = async (
  options: InitialiseDemoSchemaOptions
) => {
  await downloadAndCreateSchema(
    {
      url: DEFAULT_SCHEMA_URL,
      name: DEFAULT_NAME
    },
    options
  )
}

export const toInitCommand = () => {
  return new Command()
    .description('Initialize a new project in current directory')
    .option('-d, --demo', `Include demo 'petstore' schema`)
    .action(({ demo: includeDemo = false }) => {
      init({ includeDemo }, { logSuccess: false })
    })
}

type InitArgs = {
  includeDemo: boolean
}

type InitOptions = {
  logSuccess?: boolean
}

export const init = async ({ includeDemo }: InitArgs, options: InitOptions) => {
  createProjectFolder(options)

  if (includeDemo) {
    await initialiseDemoSchema(options)
  }
}

export const toInitPrompt = async () => {
  const includeDemo = await Toggle.prompt(`Include demo 'petstore' schema?`)

  await init({ includeDemo }, { logSuccess: true })
}

const prettierConfig = `{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
`

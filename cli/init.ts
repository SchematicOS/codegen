import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './downloads.ts'
import { ensureDirSync } from '@std/fs'
import { join } from '@std/path'
import { writeFile } from './file.ts'
import { DEFAULT_NAME, DEFAULT_SCHEMA_URL } from './constants.ts'
import { Toggle } from '@cliffy/prompt'

export const createProjectFolder = () => {
  ensureDirSync(join(Deno.cwd(), '.schematic'))

  writeFile({
    content: prettierConfig,
    resolvedPath: join(Deno.cwd(), '.schematic', 'prettier.json')
  })
}

export const initialiseDemoSchema = async () => {
  await downloadAndCreateSchema({
    url: DEFAULT_SCHEMA_URL,
    name: DEFAULT_NAME
  })
}

export const toInitCommand = () => {
  return new Command()
    .description('Initialize a new project in current directory')
    .option('-d, --demo', `Include demo 'petstore' schema`)
    .action(({ demo: includeDemo = false }) => {
      init({ includeDemo })
    })
}

type InitArgs = {
  includeDemo: boolean
}

export const init = async ({ includeDemo }: InitArgs) => {
  createProjectFolder()

  if (includeDemo) {
    await initialiseDemoSchema()
  }
}

export const toInitPrompt = async () => {
  const includeDemo = await Toggle.prompt(`Include demo 'petstore' schema?`)

  await init({ includeDemo })
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

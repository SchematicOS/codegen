import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './downloads.ts'
import { ensureDirSync } from '@std/fs'
import { join } from '@std/path'
import { writeFile } from './file.ts'

const DEFAULT_SCHEMA_URL = 'https://petstore3.swagger.io/api/v3/openapi.json'
const DEFAULT_NAME = 'petstore'

export const toInitCommand = () => {
  return new Command()
    .description('Initialize a new project in current directory')
    .option('-d, --default', 'Initialise with default schema')
    .action(({ default: createDefaultSchema }) => {
      if (createDefaultSchema) {
        downloadAndCreateSchema({
          url: DEFAULT_SCHEMA_URL,
          name: DEFAULT_NAME
        })
      } else {
        ensureDirSync(join(Deno.cwd(), '.schematic'))
      }

      writeFile({
        content: prettierConfig,
        resolvedPath: join(Deno.cwd(), '.schematic', 'prettier.json')
      })
    })
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

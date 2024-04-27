import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './prompt.ts'
import { ensureDirSync } from '@std/fs'
import { join } from '@std/path'

const DEFAULT_SCHEMA_URL = 'https://petstore3.swagger.io/api/v3/openapi.json'
const DEFAULT_NAME = 'petstore'

export const toInitCommand = () => {
  console.log('toInitCommand')

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
    })
}

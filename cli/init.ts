import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './prompt.ts'

const DEFAULT_SCHEMA_URL = 'https://petstore3.swagger.io/api/v3/openapi.json'
const DEFAULT_NAME = 'petstore'

export const toInitCommand = () => {
  return new Command()
    .command('init', 'Initialize a new project in current directory')
    .option('-d, --default', 'Initialise with default schema')
    .action(() => {
      downloadAndCreateSchema({ url: DEFAULT_SCHEMA_URL, name: DEFAULT_NAME })
    })
}

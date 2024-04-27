import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './downloads.ts'

export const toAddCommand = () => {
  return new Command()
    .description('Add a new schema from url to project')
    .arguments('<name:string> <url:string>')
    .action((_options, name, url) => {
      downloadAndCreateSchema({ name, url })
    })
}

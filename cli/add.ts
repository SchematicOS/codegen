import { Command } from '@cliffy/command'
import { downloadAndCreateSchema } from './downloads.ts'
import { Input } from '@cliffy/prompt'

export const toAddCommand = () => {
  return new Command()
    .description('Add a new schema from url to project')
    .arguments('<name:string> <url:string>')
    .action((_options, name, url) => {
      add({ name, url }, { logSuccess: false })
    })
}

export const toAddPrompt = async () => {
  const name = await Input.prompt({
    message: 'Enter schema name'
  })

  const url = await Input.prompt({
    message: 'Enter schema url'
  })

  await add({ name, url }, { logSuccess: true })
}

type AddArgs = {
  name: string
  url: string
}

type AddOptions = {
  logSuccess?: boolean
}

const add = async ({ name, url }: AddArgs, options: AddOptions) => {
  await downloadAndCreateSchema({ name, url }, options)
}

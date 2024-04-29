import { Command } from '@cliffy/command'
import { VERSION } from '../version.ts'
import { toGeneratePrompt, toGenerateCommand } from './generate.ts'
import { toInitPrompt, toInitCommand } from './init.ts'
import { toClonePrompt, toCloneCommand } from './clone.ts'
import { toAddPrompt, toAddCommand } from './add.ts'
import { Select } from '@cliffy/prompt'
import { match } from 'ts-pattern'

const promptwise = async () => {
  const action = await Select.prompt({
    message: 'Welcome to smktc! What would you like to do?',
    options: [
      { name: 'Create new project', value: 'init' },
      { name: 'Run code generator', value: 'generate' },
      { name: 'Clone a plugin from JSR registry for editing', value: 'clone' },
      { name: 'Add a new schema from url', value: 'add' },
      { name: 'Exit', value: 'exit' }
    ]
  })

  await match(action)
    .with('init', async () => await toInitPrompt())
    .with('generate', async () => await toGeneratePrompt())
    .with('clone', async () => await toClonePrompt())
    .with('add', async () => await toAddPrompt())
    .with('exit', () => Deno.exit(0))
    .otherwise(matched => {
      throw new Error(`Invalid action: ${matched}`)
    })

  console.log('Done')

  setTimeout(promptwise, 0)
}

await new Command()
  .version(VERSION)
  .action(async () => {
    await promptwise()
  })
  .command('generate', toGenerateCommand())
  .command('init', toInitCommand())
  .command('clone', toCloneCommand())
  .command('add', toAddCommand())
  .parse(Deno.args)

import { Command } from '@cliffy/command'
import { VERSION } from '../version.ts'
import { handleGenerate, toGenerateCommand } from './generate.ts'
import { handleInit, toInitCommand } from './init.ts'
import { toCloneCommand } from './clone.ts'
import { toAddCommand } from './add.ts'
import { toListCommand } from './list.ts'
import { Select } from '@cliffy/prompt'
import { match } from 'ts-pattern'

const promptwise = async () => {
  const action = await Select.prompt({
    message: 'Welcome to smktc! What would you like to do?',
    options: [
      { name: 'Create new project', value: 'init' },
      { name: 'Run code generator', value: 'generate' },
      { name: 'Exit', value: 'exit' }
    ]
  })

  await match(action)
    .with('init', async () => await handleInit())
    .with('generate', async () => await handleGenerate())
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
  .command('list', toListCommand())
  .parse(Deno.args)

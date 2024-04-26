import { Command } from '@cliffy/command'
import { VERSION } from '../version.ts'
import { toGenerateCommand } from './generate.ts'
import { toInitCommand } from './init.ts'
import { toCloneCommand } from './clone.ts'
import { toAddCommand } from './add.ts'
import { toListCommand } from './list.ts'

await new Command()
  .version(VERSION)
  .command('generate', toGenerateCommand())
  .command('init', toInitCommand())
  .command('clone', toCloneCommand())
  .command('add', toAddCommand())
  .command('list', toListCommand())
  .parse(Deno.args)

import { Command } from '@cliffy/command'

export const toListCommand = () => {
  return new Command()
    .command('list', 'List available transformers and type-systems')
    .action(() => {
      console.log('Not implemented')
    })
}

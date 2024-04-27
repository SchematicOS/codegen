import { Command } from '@cliffy/command'

export const toListCommand = () => {
  return new Command()
    .description('List available transformers and type-systems')
    .action(() => {
      console.log('Not implemented')
    })
}

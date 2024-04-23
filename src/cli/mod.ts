import { Command } from '@cliffy/command'

await new Command()
  .version('0.0.1')
  .command('generate', 'Generate code from OpenAPI schema')
  .option(
    '-t --transformers [modules...:string]',
    'List of transformers to use',
    { required: true }
  )
  .option('-s --typeSystem [module:string]', 'Type system to use', {
    default: 'jsr:@schematicos/zod'
  })
  .action((...args) => {
    console.log('Server is starting', args)
  })
  .parse(Deno.args)

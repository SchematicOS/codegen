import { Command } from '@cliffy/command'

await new Command()
  .version('0.0.1')
  .command('generate', 'Generate code from OpenAPI schema')
  .option(
    '-t --transformers [modules...:string]',
    'List of transformers to use',
    { required: true }
  )
  .example(
    'Generate MUI forms with RTK Query api client using Zod types',
    'generate -t jsr:@schematicos/rtk-query jsr:@schematicos/mui-forms -s jsr:@schematicos/zod'
  )
  .option('-s --typeSystem [module:string]', 'Type system to use', {
    default: 'jsr:@schematicos/zod'
  })
  .action((...args) => {
    console.log('Server is starting', args)
  })
  .parse(Deno.args)

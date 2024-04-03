#!/usr/bin/env node

import { cac } from 'cac'
import { generate } from 'generate/generate.ts'

const cli = cac()

cli
  .command('generate', 'Generate client code')
  .option('--src <source>', 'Schema source file name. Defaults to schema.json')
  .option('-t, --transformers <transformers>', 'Transformer package names separated by commas')
  .option('--ts <typeSystem>', 'TypeSystem Transformer package name')
  .option('-c, --config <config>', 'Optional JSON file to map outputs')
  .action(({ src, transformers, ts, config }) => {
    void generate({
      source: src,
      transformers,
      typeSystem:ts,
      config
    })
  })

// Display help message when `-h` or `--help` appears
cli.help()
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version('0.0.1')

cli.parse()

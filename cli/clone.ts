import { Command } from '@cliffy/command'
import { ensureFile } from '@std/fs'
import { downloadPackage } from './prompt.ts'
import { join } from '@std/path'

export const downloadAndCreatePackage = async (plugin: string) => {
  const entries = await downloadPackage(plugin)

  const pluginName = plugin.split('/').at(1)

  if (!pluginName) {
    throw new Error(`Invalid plugin name ${plugin}`)
  }

  entries.forEach(async ([path, content]) => {
    const joinedPath = join('./plugins', pluginName, path)
    await ensureFile(joinedPath)
    Deno.writeTextFileSync(joinedPath, content)
  })
}

export const toCloneCommand = () => {
  return new Command()
    .command(
      'clone',
      'Clone a transformer or type-system from JSR registry for editing'
    )
    .example(
      'Clone RTK Query transformer from JSR registry',
      'clone jsr:@schematicos/rtk-query'
    )
    .arguments('<plugin:string>')
    .action((_options, plugin) => {
      if (!plugin.startsWith('jsr:')) {
        throw new Error('Only JSR registry plugins are supported')
      }

      downloadAndCreatePackage(plugin)
    })
}

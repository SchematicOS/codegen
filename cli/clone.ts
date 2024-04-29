import { Command } from '@cliffy/command'
import { ensureFile } from '@std/fs'
import { downloadPackage } from './downloads.ts'
import { join } from '@std/path'
import { Input } from '@cliffy/prompt'
import { PLUGINS } from './constants.ts'

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
    .description(
      'Clone a transformer or type-system from JSR registry for editing'
    )
    .example(
      'Clone RTK Query transformer from JSR registry',
      'clone jsr:@schematicos/rtk-query'
    )
    .arguments('<plugin:string>')
    .action((_options, plugin) => clone(plugin))
}

export const toClonePrompt = async () => {
  const plugin: string = await Input.prompt({
    message: 'Select plugin to clone',
    suggestions: PLUGINS
  })

  await clone(plugin)
}

const clone = async (plugin: string) => {
  if (!plugin.startsWith('jsr:')) {
    throw new Error('Only JSR registry plugins are supported')
  }

  const name = plugin.replace('jsr:', '')

  await downloadAndCreatePackage(name)
}

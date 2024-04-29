import { existsSync } from '@std/fs'
import { join } from '@std/path'

export const readFile = <ConfigType>(path: string): ConfigType | undefined => {
  if (!path) {
    return
  }

  if (!existsSync(path)) {
    return
  }

  try {
    const decoder = new TextDecoder('utf-8')

    const data = Deno.readFileSync(path)
    const decoded = decoder.decode(data)

    const config: ConfigType | undefined = JSON.parse(decoded)

    return config
  } catch (error) {
    console.error(error)
  }
}

type WriteFileArgs = {
  content: string
  resolvedPath: string
}

export const writeFile = ({ content, resolvedPath }: WriteFileArgs) => {
  try {
    const dir = resolvedPath.substring(0, resolvedPath.lastIndexOf('/'))

    if (!existsSync(dir)) {
      Deno.mkdirSync(dir, { recursive: true })
    }

    const encoder = new TextEncoder()
    const encoded = encoder.encode(content)

    Deno.writeFileSync(resolvedPath, encoded)
  } catch (error) {
    console.error(error)
  }
}

export const hasSchema = async (schemaName: string) => {
  try {
    const jsonFileInfo = await Deno.stat(
      join('.schematic', schemaName, 'schema.json')
    )

    if (jsonFileInfo.isFile) {
      return true
    }
  } catch (_error) {
    // ignore
  }

  try {
    const yamlFileInfo = await Deno.stat(
      join('.schematic', schemaName, 'schema.yaml')
    )

    if (yamlFileInfo.isFile) {
      return true
    }
  } catch (_error) {
    // ignore
  }

  try {
    const ymlFileInfo = await Deno.stat(
      join('.schematic', schemaName, 'schema.yml')
    )

    if (ymlFileInfo.isFile) {
      return true
    }
  } catch (_error) {
    // ignore
  }

  return false
}

export const getDirectoryContents = async (dirPath: string) => {
  try {
    return await Deno.readDir(dirPath)
  } catch (_error) {
    // console.error(`Could not read contents of '${dirPath}' directory`, error)
  }
}

export const getDirectoryNames = async (
  contents: AsyncIterable<Deno.DirEntry> | undefined
) => {
  if (!contents) {
    return
  }

  const items = []

  for await (const item of contents) {
    if (item.isDirectory) {
      const hasSchemaFile = await hasSchema(item.name)

      if (hasSchemaFile) {
        items.push(item.name)
      }
    }
  }

  return items
}

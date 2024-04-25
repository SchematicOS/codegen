import { existsSync } from 'fs'

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

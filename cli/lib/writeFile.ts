import { existsSync } from 'fs'

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
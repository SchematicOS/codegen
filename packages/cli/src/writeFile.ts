import { existsSync } from 'jsr:@std/fs@0.222.1'

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

    console.log(`Writing file to ${resolvedPath}`)
    const encoder = new TextEncoder();
    const encoded = encoder.encode(content);

    Deno.writeFileSync(resolvedPath, encoded)
  } catch (error) {
    console.error(error)
  }
}

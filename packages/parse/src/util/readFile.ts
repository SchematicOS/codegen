import { resolve } from 'jsr:@std/path@0.222.1'
import { existsSync } from 'jsr:@std/fs@0.222.1'


export const readFile = <ConfigType>(directory: string, filename?: string): ConfigType | undefined  => {
  if (!filename) {
    return
  }

  const resolvedPath = resolve(directory, filename)

  if (!existsSync(resolvedPath)) {
    return
  }

  try {
    const decoder = new TextDecoder("utf-8");
    
    const data = Deno.readFileSync(resolvedPath)
    const decoded = decoder.decode(data)

    const config: ConfigType | undefined = JSON.parse(decoded)

    return config
  } catch (error) {
    console.error(error)
  }
}

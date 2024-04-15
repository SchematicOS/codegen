import { existsSync } from 'jsr:@std/fs@0.222.1'

export const readFile = <ConfigType>(path: string): ConfigType | undefined  => {
  if (!path) {
    return
  }

  if (!existsSync(path)) {
    return
  }

  try {
    const decoder = new TextDecoder("utf-8");
    
    const data = Deno.readFileSync(path)
    const decoded = decoder.decode(data)

    const config: ConfigType | undefined = JSON.parse(decoded)

    return config
  } catch (error) {
    console.error(error)
  }
}

import path from 'node:path'
import fs from 'fs'

export const readFile = <ConfigType>(directory: string, filename?: string) => {
  if (!filename) {
    return
  }

  const resolvedPath = path.resolve(directory, filename)

  if (!fs.existsSync(resolvedPath)) {
    return
  }

  try {
    const config: ConfigType | undefined = JSON.parse(
      fs.readFileSync(resolvedPath, 'utf8')
    )

    return config
  } catch (error) {
    console.error(error)
  }
}

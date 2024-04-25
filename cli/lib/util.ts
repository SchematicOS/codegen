import { join } from 'path'

export const toImportSource = (importModule: string) => {
  const transformerPath = importModule.startsWith('@')
    ? `jsr:${importModule}`
    : join(Deno.cwd(), importModule, 'mod.ts')

  return transformerPath
}

import { join } from '@std/path'

export const downloadPackage = async (name: string) => {
  const rootMetaRes = await fetch(`https://jsr.io/${name}/meta.json`)
  const rootMeta = await rootMetaRes.json()

  const versionMetaUrl = `https://jsr.io/${name}/${rootMeta.latest}_meta.json`

  const versionMetaRes = await fetch(versionMetaUrl)
  const versionMeta = await versionMetaRes.json()

  const files = Object.keys(versionMeta.manifest).map(async key => {
    const fileRes = await fetch(
      `https://jsr.io/${name}/${rootMeta.latest}/${key}`
    )
    const file = await fileRes.text()

    return [key, file] as [string, string]
  })

  return await Promise.all(files)
}

type AddSchemaArgs = {
  url: string
  name: string
}

export const downloadAndCreateSchema = async ({ url, name }: AddSchemaArgs) => {
  const fileName = new URL(url).pathname.split('/').pop()

  const fileType = fileName?.endsWith('.json')
    ? 'json'
    : fileName?.endsWith('.yaml') || fileName?.endsWith('.yml')
    ? 'yaml'
    : undefined

  if (!fileType) {
    throw new Error(`File type is not JSON or YAML: ${fileName}`)
  }

  const projectPath = join('./.schematic', name)

  Deno.mkdirSync(projectPath, { recursive: true })

  const res = await fetch(url)

  const schema = await res.text()

  Deno.writeTextFileSync(join(projectPath, `schema.${fileType}`), schema)
}

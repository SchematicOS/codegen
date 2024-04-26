import { Confirm, Input } from '@cliffy/prompt'
import { ensureFile } from '@std/fs'
import { join } from '@std/path'

const downloadPackage = async (name: string) => {
  const res = await fetch(`https://jsr.io/${name}/meta.json`)
  const data = await res.json()

  const url2 = `https://jsr.io/${name}/${data.latest}_meta.json`

  const res2 = await fetch(url2)
  const data2 = await res2.json()

  const files = Object.keys(data2.manifest).map(async key => {
    const res3 = await fetch(`https://jsr.io/${name}/${data.latest}/${key}`)
    const data3 = await res3.text()

    return [key, data3] as [string, string]
  })

  return await Promise.all(files)
}

type AddSchemaArgs = {
  url: string
  name: string
}

const downloadAndCreateSchema = async ({ url, name }: AddSchemaArgs) => {
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

export const promptNewSchema = async () => {
  const newSchema = await Confirm.prompt({ message: 'Add new schema?' })

  if (newSchema) {
    const url = await Input.prompt({
      message: 'Enter the URL of the schema',
      suggestions: ['https://petstore3.swagger.io/api/v3/openapi.json']
    })

    const name = await Input.prompt({
      message: 'Enter the name of the schema',
      suggestions: ['petstore']
    })

    return () => downloadAndCreateSchema({ url, name })
  }

  return () => {}
}

const downloadAndCreatePackage = async (transformer: string) => {
  const entries = await downloadPackage(transformer)

  const [_a, transformerName] = transformer.split('/')

  entries.forEach(async ([path, content]) => {
    const joinedPath = join('./_transformers', transformerName, path)
    await ensureFile(joinedPath)
    Deno.writeTextFileSync(joinedPath, content)
  })
}

export const promptCloneTransformer = async () => {
  const cloneTransformer = await Confirm.prompt({
    message: 'Clone existing transformer for editing?'
  })

  if (cloneTransformer) {
    const transformer = await Input.prompt({
      message: 'Enter the name of the transformer to clone',
      suggestions: ['@schematicos/rtk-query']
    })

    return () => downloadAndCreatePackage(transformer)
  }
}

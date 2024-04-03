import { TextInstance } from '@/elements/TextInstance.ts'
import { Instance } from '@/elements/createInstance.ts'
import { GenerateContext } from '@/lib/GenerateContext.ts'

export class Container {
  type: 'container'
  ctx: GenerateContext
  children: (Instance | TextInstance)[]

  constructor(ctx: GenerateContext) {
    this.type = 'container'

    this.ctx = ctx
    this.children = []
  }

  appendChild(child: Instance | TextInstance) {
    // console.log('appendChild to container', child)
    this.children.push(child)
  }

  removeChild(child: Instance | TextInstance) {
    // console.log('removeChild from container', child)
    const index = this.children.indexOf(child)

    this.children.splice(index, 1)
  }

  render() {
    const fileEntries: [string, string][] = Array.from(
      this.ctx.files.entries()
    ).map(([destination, file]) => {
      const imports = renderImports({ ctx: this.ctx, destination })

      const definitions = renderDefinitions({ ctx: this.ctx, destination })

      const content = file.content.map(child => child.toString()).join('')

      return [
        destination,
        `
${imports}

${definitions}

${content}
`
      ]
    })

    return Object.fromEntries(fileEntries)
  }
}

type RenderDefinitionsArgs = {
  destination: string
  ctx: GenerateContext
}

const renderDefinitions = ({ destination, ctx }: RenderDefinitionsArgs) => {
  const identifierMappings = ctx.files.get(destination)?.definitions

  if (!identifierMappings) {
    return ''
  }

  // console.log('MAPPINGS', identifierMappings)

  return Array.from(identifierMappings.values())
    .flatMap(({ renderedValue }) => renderedValue.toString())
    .join('\n\n')
}

type RenderImportsArgs = {
  destination: string
  ctx: GenerateContext
}

export const renderImports = ({ ctx, destination }: RenderImportsArgs) => {
  const identifierMappings = ctx.files.get(destination)?.imports

  if (!identifierMappings) {
    return ''
  }

  const groupedImports = Array.from(identifierMappings.values()).reduce<
    Record<string, Set<string>>
  >((acc, identifier) => {
    const importModule = identifier.toImportFrom()

    const importName = identifier.toImportName()

    if (!acc[importModule]) {
      acc[importModule] = new Set()
    }

    acc[importModule]?.add(importName)

    return acc
  }, {})

  return Object.entries(groupedImports)
    .map(([importModule, importNames]) => {
      const importNameList = Array.from(importNames).join(', ')

      return `import { ${importNameList} } from "${importModule}";`
    })
    .join('\n')
}

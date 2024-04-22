import type { Stringable } from '@schematicos/types'

type ConstructorArgs = {
  module: string
  importNames: ImportName[]
}

export class Import implements Stringable {
  module: string
  importNames: ImportName[]

  private constructor({ module, importNames }: ConstructorArgs) {
    this.module = module
    this.importNames = importNames
  }

  static create(
    module: string,
    importNamesArg: ImportNameArg | ImportNameArg[]
  ): Import {
    const importNames = Array.isArray(importNamesArg)
      ? importNamesArg.map(importName => ImportName.create(importName))
      : [ImportName.create(importNamesArg)]

    return new Import({
      module,
      importNames
    })
  }

  toRecord(): Record<string, ImportNameArg[]> {
    return {
      [this.module]: this.importNames.map(({ name, alias }) =>
        alias ? { [name]: alias } : name
      )
    }
  }

  toString(): string {
    // @TODO move syntax to typescript package to enable
    // language agnostic use
    return `import { ${this.importNames.join(', ')} } from '${this.module}'`
  }
}

export type ImportNameArg = string | { [name: string]: string }

export class ImportName {
  name: string
  alias?: string

  private constructor(name: string, alias?: string) {
    this.name = name
    this.alias = alias
  }

  static create(name: ImportNameArg): ImportName {
    if (typeof name === 'string') {
      return new ImportName(name)
    }

    return new ImportName(...Object.entries(name)[0])
  }

  toString(): string {
    return this.alias ? `${this.name} as ${this.alias}` : this.name
  }
}

import type { Stringable } from './Stringable.ts'

type ConstructorArgs = {
  module: string
  importNames: ImportName[]
  external: boolean | string
}

export type ImportOptions = {
  external?: boolean | string
}

export class Import implements Stringable {
  module: string
  importNames: ImportName[]
  external: boolean | string

  private constructor({
    module,
    importNames,
    external = false
  }: ConstructorArgs) {
    this.module = module
    this.importNames = importNames
    this.external = external
  }

  static create(
    module: string,
    importNamesArg: ImportNameArg | ImportNameArg[],
    { external = false }: ImportOptions = {}
  ): Import {
    const importNames = Array.isArray(importNamesArg)
      ? importNamesArg.map(importName => ImportName.create(importName))
      : [ImportName.create(importNamesArg)]

    return new Import({
      module,
      importNames,
      external
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

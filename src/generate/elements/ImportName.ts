export type ImportNameArg = string | { [name: string]: string }

export class ImportName {
  name: string
  alias?: string

  private constructor(name: string, alias?: string) {
    this.name = name
    this.alias = alias
  }

  static create(name: ImportNameArg):ImportName {
    if (typeof name === 'string') {
      return new ImportName(name)
    }

    return new ImportName(...Object.entries(name)[0])
  }

  toString():string {
    return this.alias ? `${this.name} as ${this.alias}` : this.name
  }
}

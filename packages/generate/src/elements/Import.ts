import { ImportName } from './ImportName.ts'
import type { ImportNameArg } from './ImportName.ts'
import type { Stringable } from 'npm:@schematicos/types@0.0.34'


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
  ):Import {
    const importNames = Array.isArray(importNamesArg)
      ? importNamesArg.map(importName => ImportName.create(importName))
      : [ImportName.create(importNamesArg)]

    return new Import({
      module,
      importNames
    })
  }

  toString():string {
    return `import { ${this.importNames.join(', ')} } from '${this.module}'`
  }
}

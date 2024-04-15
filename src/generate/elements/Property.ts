import { needsWrapping } from '../helpers/needsWrapping.ts'
import type { Stringable } from '@schematicos/types'

type PropertyArgs = {
  parentPath: Stringable
  property: Stringable
}

export class Property implements Stringable {
  parentPath: Stringable
  property: Stringable

  private constructor({ parentPath, property }: PropertyArgs) {
    this.parentPath = parentPath
    this.property = property
  }

  static create({ parentPath, property }: PropertyArgs):Property {
    return new Property({ parentPath, property })
  }

  toString():string {
    const property = this.property.toString()

    return needsWrapping(property)
      ? `${this.parentPath}['${property}']`
      : `${this.parentPath}.${property}`
  }
}

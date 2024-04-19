import { needsWrapping } from 'generate/helpers/needsWrapping.ts'
import type { Stringable } from '@schematicos/types'

export class Key implements Stringable {
  key: Stringable

  private constructor(key: Stringable) {
    this.key = key
  }

  static create(key: Stringable): Key {
    return new Key(key)
  }

  toString(): string {
    const key = this.key.toString()

    return needsWrapping(key) ? `'${key}'` : key
  }
}

import { EMPTY } from '../lib/constants.ts'
import type { Stringable } from 'npm:@schematicos/types@0.0.34'

export class KeyValue implements Stringable {
  key: Stringable
  value?: Stringable

  constructor(key: Stringable, value?: Stringable) {
    this.key = key
    this.value = value
  }

  static create(key: Stringable, value: Stringable):KeyValue {
    return new KeyValue(key, value)
  }

  toString():string {
    const value = this.value?.toString() || EMPTY

    return value === EMPTY ? EMPTY : `${this.key}: ${value}`
  }
}

import { EMPTY } from '../constants.ts'
import type { Stringable } from '@schematicos/types'

export class KeyValues implements Stringable {
  properties: Record<string, Stringable>

  constructor(properties: Record<string, Stringable>) {
    this.properties = properties
  }

  static create(properties: Record<string, Stringable>): KeyValues {
    return new KeyValues(properties)
  }

  toString(): string {
    const filteredEntries = Object.entries(this.properties)
      .map(([key, value]) => {
        const renderedValue = value?.toString() || EMPTY

        return renderedValue === EMPTY ? EMPTY : `${key}: ${renderedValue}`
      })
      .filter(row => row !== EMPTY)

    return `${filteredEntries.join(',\n')}`
  }
}

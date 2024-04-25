import type { Stringable } from 'types/schematic/stringable.ts'
import { match } from 'ts-pattern'

export class EntityType implements Stringable {
  type: 'value' | 'type'

  private constructor(type: 'value' | 'type') {
    this.type = type
  }

  static create(type: 'value' | 'type'): EntityType {
    return new EntityType(type)
  }

  toString(): string {
    return match(this.type)
      .with('type', () => 'type')
      .with('value', () => 'const')
      .exhaustive()
  }
}

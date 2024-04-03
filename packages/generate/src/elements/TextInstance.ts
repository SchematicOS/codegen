import { Stringable } from '@schematicos/types'

export class TextInstance implements Stringable {
  text: string

  private constructor(text: string) {
    this.text = text
  }

  static createInstance(text: string) {
    return new TextInstance(text)
  }

  toString() {
    return this.text
  }
}

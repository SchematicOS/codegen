import type { NotImplementedArgs, UnexpectedValueArgs } from './types.ts'
import { match, P } from 'ts-pattern'
import type { Trail } from 'parse/lib/Trail.ts'

type UnsupportedSection = {
  trail: Trail
  key?: string
  value?: string
  message?: string
}
export class ParseContext {
  unsupportedSections: UnsupportedSection[]

  private constructor() {
    this.unsupportedSections = []
  }

  static create() {
    return new ParseContext()
  }

  notImplemented(args: NotImplementedArgs) {
    match(args)
      .with({ skipped: P._ }, ({ trail, skipped }) => {
        Object.entries(skipped).forEach(([key, value]) => {
          this.unsupportedSections.push({
            trail,
            key,
            value: JSON.stringify(value, undefined, 2)
          })

          // console.log(
          //   `Not implemented in ${trail}: ${key} (${JSON.stringify(value, undefined, 2)})`
          // )
        })
      })
      .with({ message: P._ }, ({ trail, message }) => {
        this.unsupportedSections.push({ trail, message })

        // console.log(`Not implemented: ${trail} (${message})`)
      })
      .exhaustive()
  }

  unexpectedValue({ trail, message }: UnexpectedValueArgs) {
    console.log(`Unexpected value in ${trail}: ${message}`)
  }
}

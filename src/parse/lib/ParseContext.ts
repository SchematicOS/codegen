import type {
  NotImplementedArgs,
  UnexpectedValueArgs,
  ParsingSection
} from './types.ts'
import { match, P } from 'ts-pattern'

type UnsupportedSection = {
  section: ParsingSection
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
      .with({ skipped: P._ }, ({ section, skipped }) => {
        Object.entries(skipped).forEach(([key, value]) => {
          this.unsupportedSections.push({
            section,
            key,
            value: JSON.stringify(value, undefined, 2)
          })

          // console.log(
          //   `Not implemented in ${section}: ${key} (${JSON.stringify(value, undefined, 2)})`
          // )
        })
      })
      .with({ message: P._ }, ({ section, message }) => {
        this.unsupportedSections.push({ section, message })

        // console.log(`Not implemented: ${section} (${message})`)
      })
      .exhaustive()
  }

  unexpectedValue({ section, message }: UnexpectedValueArgs) {
    console.log(`Unexpected value in ${section}: ${message}`)
  }
}

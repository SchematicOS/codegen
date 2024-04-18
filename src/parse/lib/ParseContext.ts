import { match, P } from 'ts-pattern'
import type { Trail } from 'parse/lib/Trail.ts'
import get from 'npm:lodash-es/get.js'

export type NotImplementedArgs =
  | {
      trail: Trail
      skipped: Record<string, unknown>
    }
  | UnexpectedValueArgs

export type UnexpectedValueArgs = {
  trail: Trail
  message: string
}

type UnsupportedSection = {
  trail: Trail
  key?: string
  value?: string
  message?: string
}
export class ParseContext {
  matched: number
  noMatched: number
  unsupportedSections: UnsupportedSection[]

  private constructor() {
    this.matched = 0
    this.noMatched = 0
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

          const lookupUpData = get(trail.document, trail.add(key).toString())
          const stringifiedLookedUpData = JSON.stringify(
            lookupUpData,
            undefined,
            2
          )

          const actualStringifiedData = JSON.stringify(value, undefined, 2)

          // console.log(
          //   `Not implemented in ${trail.add(key)}: (${actualStringifiedData})`
          // )

          if (stringifiedLookedUpData !== actualStringifiedData) {
            console.log(
              `NO MATCH: ${trail.add(
                key
              )}: GOT(${stringifiedLookedUpData}) EXPECTED(${actualStringifiedData})`
            )
            this.noMatched++
          } else {
            this.matched++
          }

          console.log('Matched:', this.matched)
          console.log('No Matched:', this.noMatched)
        })
      })
      .with({ message: P._ }, ({ trail, message }) => {
        this.unsupportedSections.push({ trail, message })

        console.log(`Not implemented: ${trail} (${message})`)
      })
      .exhaustive()
  }

  unexpectedValue({ trail, message }: UnexpectedValueArgs) {
    console.log(`Unexpected value in ${trail}: ${message}`)
  }
}

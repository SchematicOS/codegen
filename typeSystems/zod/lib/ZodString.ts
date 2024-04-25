import type { OasStringData } from 'types/oas/schemaValues.ts'
import type { Stringable } from 'types/schematic/stringable.ts'
import { match, P } from 'ts-pattern'

type ZodStringArgs = {
  value: OasStringData
}

export class ZodString implements Stringable {
  value: OasStringData

  private constructor({ value }: ZodStringArgs) {
    this.value = value
  }

  static create(args: ZodStringArgs) {
    return new ZodString(args)
  }

  toString() {
    const { format, enums } = this.value

    return match({ format, enums })
      .with({ format: 'date' }, () => {
        return 'z.string().pipe( z.coerce.date() )'
      })
      .with({ enums: P.array() }, matched => {
        return matched.enums.length === 1
          ? `z.literal('${matched.enums[0]}')`
          : `z.enum([${matched.enums.map(str => `'${str}'`).join(', ')}])`
      })
      .otherwise(() => `z.string()`)
  }
}

import type { OasString, Stringable } from 'npm:@schematicos/types@0.0.34'
import { match, P } from 'npm:ts-pattern@5.1.1'

type ZodStringArgs = {
  value: OasString
}

export class ZodString implements Stringable {
  value: OasString

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

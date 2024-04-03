import { OasString } from '@schematicos/types'
import { match, P } from 'ts-pattern'

type ZodStringProps = {
  value: OasString
}

export const ZodString = ({ value }: ZodStringProps) => {
  const { format, enums } = value

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

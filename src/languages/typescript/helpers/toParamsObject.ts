import type { OasParameter } from 'parse/elements/Parameter.ts'
import { withDescription } from 'typescript/helpers/withDescription.ts'
import {
  handleKey,
  handlePropertyName
} from 'typescript/helpers/identifiers.ts'

export const toParamsObject = (
  parameters: OasParameter[],
  queryArg: string
) => {
  const keyValues = parameters.map(({ name, description }) => {
    const keyValue = `${handleKey(name)}: ${handlePropertyName(name, queryArg)}`

    return withDescription(keyValue, description)
  })

  return `{${keyValues.join(',\n')}}`
}

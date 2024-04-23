import type { OasParameter } from 'parse/elements/Parameter.ts'
import { withDescription } from './withDescription.ts'
import { handleKey, handlePropertyName } from './identifiers.ts'

export const toParamsObject = (
  parameters: OasParameter[],
  queryArg: string
): string => {
  const keyValues = parameters.map(({ name, description }) => {
    const keyValue = `${handleKey(name)}: ${handlePropertyName(name, queryArg)}`

    return withDescription(keyValue, description)
  })

  return `{${keyValues.join(',\n')}}`
}

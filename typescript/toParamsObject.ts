import type { OasParameter } from '../oas-elements/Parameter.ts'
import { withDescription } from './withDescription.ts'
import { handleKey, handlePropertyName } from './identifiers.ts'
import { EMPTY } from '../dsl/constants.ts'

export const toParamsObject = (
  parameters: OasParameter[] | undefined,
  queryArg: string
): string => {
  if (!parameters?.length) {
    return EMPTY
  }

  const keyValues = parameters.map(({ name, description }) => {
    const keyValue = `${handleKey(name)}: ${handlePropertyName(name, queryArg)}`

    return withDescription(keyValue, description)
  })

  return `{${keyValues.join(',\n')}}`
}

import type { Stringable } from 'types'

export const withDescription = (
  value: Stringable,
  description?: string
): string => {
  return description ? `/** ${description} */\n${value}` : `${value}`
}

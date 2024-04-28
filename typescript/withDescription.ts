import type { Stringable } from '../dsl/Stringable.ts'

export const withDescription = (
  value: Stringable,
  description?: string
): string => {
  return description ? `/** ${description} */\n${value}` : `${value}`
}

import type { Stringable } from '../schematic-types/stringable.ts'

export const withDescription = (
  value: Stringable,
  description?: string
): string => {
  return description ? `/** ${description} */\n${value}` : `${value}`
}

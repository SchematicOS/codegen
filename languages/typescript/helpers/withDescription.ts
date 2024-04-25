import type { Stringable } from 'types/schematic/stringable.ts'

export const withDescription = (
  value: Stringable,
  description?: string
): string => {
  return description ? `/** ${description} */\n${value}` : `${value}`
}

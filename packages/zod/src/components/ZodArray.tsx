import { OasArray, Stringable } from '@schematicos/types'
import { $ } from '@schematicos/generate'

type ZodArrayProps = {
  value: OasArray
  children: Stringable
}

export const ZodArray = ({ children }: ZodArrayProps) => {
  return $`z.array(${children})`
}

import { ReactNode } from 'react'
import { $ } from '@schematicos/generate'

type ZodIntersectionProps = {
  members: ReactNode[]
  discriminator?: {
    propertyName: string
  }
}

export const ZodIntersection = ({ members }: ZodIntersectionProps) => {
  return members.reduce<ReactNode>((acc, member, index) => {
    return index === 0 ? member : $`${acc}.and(${member})`
  }, '')
}

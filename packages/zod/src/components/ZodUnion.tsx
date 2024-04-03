import { ReactNode } from 'react'
import { $, elements } from '@schematicos/generate'

const { List } = elements

type ZodUnionProps = {
  members: ReactNode[]
  discriminator?: {
    propertyName: string
  }
}

// type FromValueUnionArgs = {

export const ZodUnion = ({ members, discriminator }: ZodUnionProps) => {
  return discriminator
    ? $`z.discriminatedUnion('${discriminator.propertyName}', ${(
        <List separator={`,\n`} wrapper="array">
          {members}
        </List>
      )})`
    : $`z.union(${(
        <List separator={`,\n`} wrapper="array">
          {members}
        </List>
      )})`
}

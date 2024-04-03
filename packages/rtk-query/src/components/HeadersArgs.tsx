import { elements } from '@schematicos/generate'
import { OasParameter, OasRef } from '@schematicos/types'
import { match } from 'ts-pattern'

const { List, NameValue } = elements

type HeadersArgsProps = {
  parameters?: (OasParameter | OasRef)[]
  parentPath?: string
}

export const HeadersArgs = ({
  parameters = [],
  parentPath
}: HeadersArgsProps) => {
  const items = parameters
    .filter((item): item is OasParameter => {
      return match(item)
        .with({ schematicType: 'parameter' }, ({ name, location }) => {
          return location === 'header' && name !== 'Authorization'
        })
        .with({ schematicType: 'ref' }, () => {
          console.log('Implement ref look up')
          return false
        })
        .exhaustive()
    })
    .map(({ name }) => (
      <NameValue key={name} name={name} parentPath={parentPath}>
        {name}
      </NameValue>
    ))

  if (!items.length) {
    return
  }

  return (
    <NameValue name="headers">
      <List separator={`,\n`} wrapper="object">
        {items}
      </List>
    </NameValue>
  )
}

import { elements } from '@schematicos/generate'
import { OasParameter, OasRef } from '@schematicos/types'
import { match } from 'ts-pattern'

const { List, NameValue } = elements

type ParamsArgsProps = {
  parameters?: (OasParameter | OasRef)[]
  parentPath?: string
}

export const ParamsArgs = ({
  parameters = [],
  parentPath
}: ParamsArgsProps) => {
  const items = parameters
    .filter((item): item is OasParameter => {
      return match(item)
        .with({ schematicType: 'parameter' }, matched => {
          return matched.location === 'path' || matched.location === 'query'
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
    <NameValue name="params">
      <List separator={`,\n`} wrapper="object">
        {items}
      </List>
    </NameValue>
  )
}

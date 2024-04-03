import { OasOperation } from '@schematicos/types'
import { $, elements } from '@schematicos/generate'
import { HeadersArgs } from '@/components/HeadersArgs.tsx'
import { ParamsArgs } from '@/components/ParamsArgs.tsx'

const { NameValue, List } = elements

type QueryCallProps = {
  queryArg?: string
  operation: OasOperation
}

export const QueryCall = ({
  operation,
  queryArg = 'queryArg'
}: QueryCallProps) => {
  const { parameters } = operation

  const hasParams = operation.parameters?.length || operation.requestBody

  if (!hasParams) {
    return `() => ({
        url: ${toPathTemplate({ operation, queryArg })},
        method: "${operation.method.toUpperCase()}"
      })`
  }

  const list = (
    <List key="key" separator={`,\n`} wrapper="object">
      <NameValue name="url">
        {toPathTemplate({ operation, queryArg })}
      </NameValue>
      <NameValue name="method">{`"${operation.method.toUpperCase()}"`}</NameValue>
      <HeadersArgs parameters={parameters} parentPath={queryArg} />
      <ParamsArgs parameters={parameters} parentPath={queryArg} />
      {operation.requestBody ? (
        <NameValue name="body" parentPath={queryArg}>
          body
        </NameValue>
      ) : null}
    </List>
  )

  return $`(${hasParams ? queryArg : ''}) => (${list})`
}

type ToPathTemplateArgs = {
  operation: OasOperation
  queryArg: string
}

const toPathTemplate = ({ operation, queryArg }: ToPathTemplateArgs) => {
  return `\`${operation.path.replaceAll(
    /{([^}]*)}/g,
    '${' + queryArg + '.$1}'
  )}\``
}

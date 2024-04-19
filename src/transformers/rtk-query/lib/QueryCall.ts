import type { Stringable } from '@schematicos/types'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { EMPTY } from 'generate/constants.ts'
import { KeyValues } from 'typescript/lib/KeyValues.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import { handleKey, handlePropertyName } from 'typescript/helpers/names.ts'

type QueryCallProps = {
  queryArg: string
  operation: OasOperation
  context: CoreContext
}

export class QueryCall extends SchematicBase implements Stringable {
  operation: OasOperation
  queryArg: string
  properties: KeyValues
  isEmpty: boolean

  private constructor({ operation, context, queryArg }: QueryCallProps) {
    super({ context })

    this.queryArg = queryArg
    this.operation = operation

    const { isEmpty, properties } = toProperties({
      operation,
      queryArg
    })

    this.properties = properties
    this.isEmpty = isEmpty
  }

  static create(args: QueryCallProps): QueryCall {
    return new QueryCall(args)
  }

  toString(): string {
    return `(${this.isEmpty ? '' : this.queryArg}) => ({${this.properties}})`
  }
}

type ToPropertiesArgs = {
  operation: OasOperation
  queryArg: string
}

const toProperties = ({ operation, queryArg }: ToPropertiesArgs) => {
  const parameters = operation.parameters?.map(parameter => parameter.resolve())

  const params = parameters?.filter(
    ({ location }) => location === 'path' || location === 'query'
  )

  const headers = parameters?.filter(
    ({ location, name }) => location === 'header' && name !== 'Authorization'
  )

  const isEmpty = !params?.length && !headers?.length && !operation.requestBody

  const properties = KeyValues.create({
    path: operation.toPathTemplate(queryArg),
    method: operation.method.toUpperCase(),
    params: toKeyValues(params, queryArg),
    headers: toKeyValues(headers, queryArg),
    body: operation.requestBody ? `${queryArg}.body` : EMPTY
  })

  return { isEmpty, properties }
}

const toKeyValues = (
  parameters: OasParameter[] | undefined,
  queryArg: string
) => {
  const mapped = parameters?.map(({ name }) => {
    return `${handleKey(name)}: ${handlePropertyName(name, queryArg)}`
  })

  return mapped?.length ? `{\n${mapped.join(',\n')}\n}` : EMPTY
}

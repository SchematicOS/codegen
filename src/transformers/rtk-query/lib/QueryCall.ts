import type { Stringable } from '@schematicos/types'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { EMPTY } from 'generate/constants.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import { handleKey, handlePropertyName } from 'typescript/helpers/names.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'
import type { OasRequestBody } from 'parse/elements/RequestBody.ts'
import type { OasRef } from 'parse/elements/Ref.ts'
import { keyValues } from 'typescript/helpers/keyValues.ts'

type QueryCallProps = {
  queryArg: string
  operation: OasOperation
  context: CoreContext
}

type QueryProperties = {
  params: OasParameter[] | undefined
  headers: OasParameter[] | undefined
  body: OasRequestBody | OasRef<'requestBody'> | undefined
}

export class QueryCall extends SchematicBase implements Stringable {
  operation: OasOperation
  queryArg: string
  properties: QueryProperties

  private constructor({ operation, context, queryArg }: QueryCallProps) {
    super({ context })

    this.queryArg = queryArg
    this.operation = operation

    this.properties = toProperties({ operation, queryArg })
  }

  static create(args: QueryCallProps): QueryCall {
    return new QueryCall(args)
  }

  toString(): string {
    const { params, headers, body } = this.properties
    const isEmpty = !params?.length && !headers?.length && !body

    return `(${isEmpty ? '' : this.queryArg}) => ({${keyValues({
      path: toPathTemplate(this.operation.path, this.queryArg),
      method: this.operation.method.toUpperCase(),
      params: toKeyValues(params, this.queryArg),
      headers: toKeyValues(headers, this.queryArg),
      body: this.operation.requestBody ? `${this.queryArg}.body` : EMPTY
    })}})`
  }
}

type ToPropertiesArgs = {
  operation: OasOperation
  queryArg: string
}

const toProperties = ({ operation }: ToPropertiesArgs) => {
  const parameters = operation.parameters?.map(parameter => parameter.resolve())

  const params = parameters?.filter(
    ({ location }) => location === 'path' || location === 'query'
  )

  const headers = parameters?.filter(
    ({ location, name }) => location === 'header' && name !== 'Authorization'
  )

  return { params, headers, body: operation.requestBody }
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

import type { Stringable } from '../dsl/Stringable.ts'
import { SchematicBase } from '../dsl/SchematicBase.ts'
import { EMPTY } from '../dsl/constants.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasOperation } from '../oas-elements/Operation.ts'
import type { OasParameter } from '../oas-elements/Parameter.ts'
import { toPathTemplate } from '../typescript/toPathTemplate.ts'
import type { OasRequestBody } from '../oas-elements/RequestBody.ts'
import type { OasRef } from '../oas-elements/Ref.ts'
import { keyValues } from '../typescript/keyValues.ts'
import { toParamsObject } from '../typescript/toParamsObject.ts'

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

    this.properties = toArgProperties({ operation, queryArg })
  }

  static create(args: QueryCallProps): QueryCall {
    return new QueryCall(args)
  }

  toString(): string {
    const { params, headers, body } = this.properties
    const { path } = this.operation
    const isEmpty = !params?.length && !headers?.length && !body

    return `(${isEmpty ? '' : this.queryArg}) => (${keyValues({
      path: toPathTemplate(path, this.queryArg),
      method: this.operation.method.toUpperCase(),
      params: params?.length ? toParamsObject(params, this.queryArg) : EMPTY,
      headers: headers?.length ? toParamsObject(headers, this.queryArg) : EMPTY,
      body: this.operation.requestBody ? `${this.queryArg}.body` : EMPTY
    })})`
  }
}

type ToPropertiesArgs = {
  operation: OasOperation
  queryArg: string
}

const toArgProperties = ({ operation }: ToPropertiesArgs) => {
  const parameters = operation.parameters?.map(parameter => parameter.resolve())

  const params = parameters?.filter(
    ({ location }) => location === 'path' || location === 'query'
  )

  const headers = parameters?.filter(
    ({ location, name }) => location === 'header' && name !== 'Authorization'
  )

  return { params, headers, body: operation.requestBody }
}

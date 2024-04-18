import type { Stringable } from '@schematicos/types'
import { toParamsArgs } from './toParamsArgs.ts'
import { isRef } from 'generate/helpers/ref.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { EMPTY } from 'generate/constants.ts'
import { KeyValues } from 'generate/elements/KeyValues.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'

type QueryCallProps = {
  queryArg: string
  operation: OasOperation
  context: GenerateContext
}

export class QueryCall extends SchematicBase implements Stringable {
  operation: OasOperation
  queryArg: string
  properties: KeyValues

  private constructor({ operation, context, queryArg }: QueryCallProps) {
    super({ context })

    this.queryArg = queryArg
    this.operation = operation

    this.properties = toProperties({
      operation,
      queryArg,
      context
    })
  }

  static create(args: QueryCallProps): QueryCall {
    return new QueryCall(args)
  }

  toString(): string {
    return `(${this.queryArg}) => ({${this.properties}})`
  }
}

type ToPropertiesArgs = {
  operation: OasOperation
  queryArg: string
  context: GenerateContext
}

const toProperties = ({
  operation,
  queryArg,
  context
}: ToPropertiesArgs): KeyValues => {
  const { parameters = [], requestBody } = operation

  const resolvedParameters = parameters.map(item => {
    return isRef(item) ? context.resolveRef(item) : item
  })

  const params = toParamsArgs({
    parameters: resolvedParameters.filter(({ location }) => {
      return location === 'path' || location === 'query'
    }),
    parentPath: queryArg
  })

  const headers = toParamsArgs({
    parameters: resolvedParameters.filter(({ name, location }) => {
      return location === 'header' && name !== 'Authorization'
    }),
    parentPath: queryArg
  })

  return KeyValues.create({
    path: operation.toPathTemplate(queryArg),
    method: operation.method.toUpperCase(),
    params,
    headers,
    body: requestBody ? `${queryArg}.body` : EMPTY
  })
}

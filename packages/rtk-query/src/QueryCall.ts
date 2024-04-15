import type { OasOperation, Stringable } from 'npm:@schematicos/types@0.0.34'
import { toParamsArgs } from './toParamsArgs.ts'
import { isRef } from 'jsr:@schematicos/generate@0.0.2/ref'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.2/SchematicBase'
import { EMPTY } from 'jsr:@schematicos/generate@0.0.2/constants'
import { KeyValue } from 'jsr:@schematicos/generate@0.0.2/KeyValue'
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'

type QueryCallProps = {
  queryArg: string
  operation: OasOperation
  context: GenerateContext
}

export class QueryCall extends SchematicBase implements Stringable {
  operation: OasOperation
  queryArg: string

  private constructor({ operation, context, queryArg }: QueryCallProps) {
    super({ context })

    this.queryArg = queryArg
    this.operation = operation

    this.children = toChidren({ operation, queryArg, context })
  }

  static create(args: QueryCallProps):QueryCall {
    return new QueryCall(args)
  }

  toString():string {
    return `(${this.queryArg}) => ({${this.renderChildren(',\n')}})`
  }
}

type ToChildrenArgs = {
  operation: OasOperation
  queryArg: string
  context: GenerateContext
}

const toChidren = ({
  operation,
  queryArg,
  context
}: ToChildrenArgs): Stringable[] => {
  const { parameters = [], requestBody } = operation

  const path = toPathTemplate({
    operation,
    queryArg
  })

  const method = operation.method.toUpperCase()

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

  return [
    KeyValue.create('path', path),
    KeyValue.create('method', method),
    KeyValue.create('params', params),
    KeyValue.create('headers', headers),
    KeyValue.create('body', requestBody ? 'body' : EMPTY)
  ]

  // Is this a better api?
  // KeyValues.create({
  //   path,
  //   method,
  //   params,
  //   headers,
  //   body: requestBody ? 'body' : EMPTY
  // })
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

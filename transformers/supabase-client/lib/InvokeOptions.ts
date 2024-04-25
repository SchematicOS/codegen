import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { Stringable } from 'types'
import type { CoreContext } from 'context/CoreContext.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { keyValues } from 'typescript/helpers/keyValues.ts'
import { EMPTY } from 'generate/constants.ts'

type InvokeOptionsArgs = {
  context: CoreContext
  operation: OasOperation
  queryArg: string
}

export class InvokeOptions extends SchematicBase implements Stringable {
  operation: OasOperation
  queryArg: string

  private constructor({ context, operation, queryArg }: InvokeOptionsArgs) {
    super({ context })

    this.operation = operation
    this.queryArg = queryArg
  }

  static create({
    context,
    operation,
    queryArg
  }: InvokeOptionsArgs): InvokeOptions {
    return new InvokeOptions({ context, operation, queryArg })
  }

  toString(): string {
    return keyValues({
      method: `'${this.operation.method.toUpperCase()}'`,
      body: this.operation.requestBody ? `${this.queryArg}.body` : EMPTY
    })
  }
}

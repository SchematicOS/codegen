import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { Stringable } from '../schematicTypes/stringable.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { OasOperation } from '../oasElements/Operation.ts'
import { keyValues } from '../typescript/keyValues.ts'
import { EMPTY } from '../generate/constants.ts'

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

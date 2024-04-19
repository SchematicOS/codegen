import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { Stringable } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'

export type EndpointArgs = {
  context: CoreContext
  settings: OperationSettings
  operation: OasOperation
}

export class Endpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  settings: OperationSettings

  private constructor({ context, operation, settings }: EndpointArgs) {
    super({ context })

    this.operation = operation
    this.settings = settings
  }

  static create({ context, operation, settings }: EndpointArgs): Endpoint {
    return new Endpoint({ context, operation, settings })
  }

  toString(): string {
    return `IMPLEMENT ME: Endpoint.toString()`
  }
}

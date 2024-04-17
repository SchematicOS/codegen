import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { OasOperationData, Stringable } from '@schematicos/types'

export type EndpointArgs = {
  context: GenerateContext
  settings: OperationSettings
  operation: OasOperationData
}

export class Endpoint extends SchematicBase implements Stringable {
  operation: OasOperationData
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

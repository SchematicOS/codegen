import { toEndpointName, toEndpointType } from './util.ts'
import { QueryCall } from './QueryCall.ts'
import { toEndpointArg } from './toOperationArg.ts'
import { toOperationResponse } from './toOperationResponse.ts'
import type { GenerateContext } from 'generate/lib/GenerateContext.ts'
import type { Definition } from 'generate/elements/Definition.ts'
import type { OperationSettings } from 'generate/lib/Settings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { OasOperation, Stringable } from '@schematicos/types'

export type RtkEndpointArgs = {
  context: GenerateContext
  operationSettings: OperationSettings
  operation: OasOperation
}

export class RtkEndpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  operationSettings: OperationSettings

  endpointResponse: Definition
  endpointResponseType: Definition

  endpointArg: Definition
  endpointArgType: Definition

  queryCall: QueryCall

  private constructor({
    operation,
    operationSettings,
    context
  }: RtkEndpointArgs) {
    super({ context })

    this.operation = operation
    this.operationSettings = operationSettings

    this.endpointResponse = toOperationResponse({
      context,
      destinationPath: operationSettings.getExportPath(),
      operation
    })

    this.endpointResponseType =
      this.endpointResponse.identifier.toTypeDefinition()

    this.endpointArgType = this.endpointResponse.identifier.toTypeDefinition()

    this.endpointArg = toEndpointArg({
      context,
      destinationPath: operationSettings.getExportPath(),
      operation
    })

    this.queryCall = QueryCall.create({
      context,
      operation,
      queryArg: 'queryArg'
    })

    this.register()
  }

  static create(args: RtkEndpointArgs): RtkEndpoint {
    return new RtkEndpoint(args)
  }

  register() {
    const { endpointResponse, endpointResponseType } = this
    const { endpointArg, endpointArgType, context } = this

    context.registerDefinition(endpointResponse)

    context.registerDefinition(endpointResponseType)

    context.registerDefinition(endpointArg)

    context.registerDefinition(endpointArgType)
  }

  toString(): string {
    const { queryCall, operation, endpointResponseType, endpointArgType } = this

    return `${toEndpointName(operation)}: build.${toEndpointType(operation)}<${
      endpointResponseType.identifier
    },${endpointArgType.identifier}>
    ({query: ${queryCall}})`
  }
}

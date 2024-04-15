import { toEndpointName, toEndpointType } from './util.ts'
import { QueryCall } from './QueryCall.ts'
import { toEndpointArg } from './toOperationArg.ts'
import { toOperationResponse } from './toOperationResponse.ts'
import type { GenerateContext } from 'generate/lib/GenerateContext.ts'
import type { Model } from 'generate/elements/Model.ts'
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
  endpointResponse: Model
  endpointArg: Model
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
    const { context, endpointResponse, endpointArg } = this

    context.registerModel(endpointResponse)

    context.registerModel(endpointArg)
  }

  toString(): string {
    const { queryCall, operation } = this

    const endpointResponseType = this.endpointResponse.identifier.toType()

    return `${toEndpointName(operation)}: build.${toEndpointType(
      operation
    )}<${endpointResponseType},${this.endpointArg.identifier.name}>
    ({query: ${queryCall}})`
  }
}

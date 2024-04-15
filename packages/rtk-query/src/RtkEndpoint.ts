import { toEndpointName, toEndpointType } from './util.ts'
import { QueryCall } from './QueryCall.ts'
import { toEndpointArg } from './toOperationArg.ts'
import { toOperationResponse } from './toOperationResponse.ts'
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'
import type { Model } from 'jsr:@schematicos/generate@0.0.2/Model'
import type { OperationSettings } from 'jsr:@schematicos/generate@0.0.2/Settings'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.2/SchematicBase'
import type { OasOperation, Stringable } from 'npm:@schematicos/types@0.0.34'

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

  static create(args: RtkEndpointArgs):RtkEndpoint {
    return new RtkEndpoint(args)
  }

  register() {
    const { context, endpointResponse, endpointArg } = this

    context.registerModel(endpointResponse)

    context.registerModel(endpointArg)
  }

  toString():string {
    const { queryCall, operation } = this

    return `${toEndpointName(operation)}: build.${toEndpointType(operation)}<${
      this.endpointResponse.identifier.name
    },${this.endpointArg.identifier.name}>
    ({query: ${queryCall}})`
  }
}

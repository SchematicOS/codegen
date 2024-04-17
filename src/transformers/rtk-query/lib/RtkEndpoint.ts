import { toEndpointName, toEndpointType } from './util.ts'
import { QueryCall } from './QueryCall.ts'
import { toEndpointArg } from './toOperationArg.ts'
import { toOperationResponse } from './toOperationResponse.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import type { Definition } from 'generate/elements/Definition.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'
import { toTypeDefinition } from 'typescript/toTypeDefinition.ts'
import type { Operation } from 'parse/elements/Operation.ts'

export type RtkEndpointArgs = {
  context: GenerateContext
  operationSettings: OperationSettings
  operation: Operation
}

export class RtkEndpoint extends SchematicBase implements Stringable {
  operation: Operation
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

    this.endpointResponseType = toTypeDefinition(
      this.endpointResponse.identifier
    )

    this.endpointArgType = toTypeDefinition(this.endpointResponse.identifier)

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

    this.register({
      definition: this.endpointResponse,
      destinationPath: this.endpointResponse.destinationPath
    })

    this.register({
      definition: this.endpointResponseType,
      destinationPath: this.endpointResponseType.destinationPath
    })

    this.register({
      definition: this.endpointArg,
      destinationPath: this.endpointArg.destinationPath
    })

    this.register({
      definition: this.endpointArgType,
      destinationPath: this.endpointArgType.destinationPath
    })
  }

  static create(args: RtkEndpointArgs): RtkEndpoint {
    return new RtkEndpoint(args)
  }

  toString(): string {
    const { queryCall, operation, endpointResponseType, endpointArgType } = this

    return `${toEndpointName(operation)}: build.${toEndpointType(operation)}<${
      endpointResponseType.identifier
    },${endpointArgType.identifier}>
    ({query: ${queryCall}})`
  }
}

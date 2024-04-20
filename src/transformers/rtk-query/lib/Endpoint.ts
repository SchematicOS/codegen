import { QueryCall } from './QueryCall.ts'
import { toOperationResponse } from 'typescript/helpers/toOperationResponse.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Definition } from 'generate/elements/Definition.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'
import { toInferredType } from 'typescript/toInferredType.ts'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { toEndpointName, toEndpointType } from 'generate/helpers/naming.ts'
import { toOperationArg } from 'typescript/helpers/toOperationArg.ts'

export type EndpointArgs = {
  context: CoreContext
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

  private constructor({ operation, operationSettings, context }: EndpointArgs) {
    super({ context })

    this.operation = operation
    this.operationSettings = operationSettings

    const destinationPath = operationSettings.getExportPath()

    this.endpointResponse = toOperationResponse({
      context,
      destinationPath,
      operation
    })

    this.endpointResponseType = toInferredType(this.endpointResponse.identifier)

    this.endpointArg = toOperationArg({
      context,
      destinationPath,
      operation
    })

    this.endpointArgType = toInferredType(this.endpointArg.identifier)

    this.queryCall = QueryCall.create({
      context,
      operation,
      queryArg: 'queryArg'
    })

    this.register({
      definitions: [
        this.endpointResponse,
        this.endpointResponseType,
        this.endpointArg,
        this.endpointArgType
      ],
      destinationPath
    })
  }

  static create(args: EndpointArgs): RtkEndpoint {
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

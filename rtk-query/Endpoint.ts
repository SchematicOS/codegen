import { QueryCall } from './QueryCall.ts'
import { toOperationResponse } from '../typescript/toOperationResponse.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { Definition } from '../dsl/Definition.ts'
import type { OperationSettings } from '../settings/OperationSettings.ts'
import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { Stringable } from '../schematicTypes/stringable.ts'
import { toInferredType } from '../typescript/toInferredType.ts'
import type { OasOperation } from '../oasElements/Operation.ts'
import { toEndpointName, toEndpointType } from '../helpers/naming.ts'
import { toOperationArg } from '../typescript/toOperationArg.ts'

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

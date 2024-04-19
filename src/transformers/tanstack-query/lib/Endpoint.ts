import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { Stringable } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toEndpointName } from 'generate/helpers/naming.ts'

export type EndpointArgs = {
  context: CoreContext
  settings: OperationSettings
  operation: OasOperation
}

export class Endpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  settings: OperationSettings
  responseModel: Stringable

  private constructor({ context, operation, settings }: EndpointArgs) {
    super({ context })

    this.operation = operation
    this.settings = settings

    const responseSchema = this.operation
      .toSuccessResponse()
      ?.resolve()
      .toSchema()

    this.responseModel = context.toTypeSystem({
      value: responseSchema ?? OasVoid.empty(context),
      required: true,
      destinationPath: settings.getExportPath()
    })
  }

  static create({ context, operation, settings }: EndpointArgs): Endpoint {
    return new Endpoint({ context, operation, settings })
  }

  toString(): string {
    return `
    const ${toEndpointName(this.operation)} = async (deploymentId: string) => {
      const { data, error } = await supabaseClient.functions.invoke(
        ${this.operation.toPathTemplate('temp')},
        {
          method: 'GET'
        }
      )
    
      if (error) {
        throw error
      }
    
      return ${this.responseModel}.parse(data)
    }
    `
  }
}

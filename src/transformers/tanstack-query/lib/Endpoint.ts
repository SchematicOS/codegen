import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { Stringable } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toEndpointName } from 'generate/helpers/naming.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'

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
    const ${toEndpointName(
      this.operation
    )}Fn = async (deploymentId: string) => {
      const res = await fetch(
        ${toPathTemplate(this.operation.path)},
        {
          method: '${this.operation.method.toUpperCase()}',
        }
      )

      const data = await res.json()
    
      return ${this.responseModel}.parse(data)
    }
    `
  }
}

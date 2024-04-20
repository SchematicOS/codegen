import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { Stringable } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { toEndpointName } from 'generate/helpers/naming.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { InvokeOptions } from './InvokeOptions.ts'

export type EndpointArgs = {
  context: CoreContext
  settings: OperationSettings
  operation: OasOperation
}

export class Endpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  settings: OperationSettings
  responseModel: Stringable
  invokeOptions: Stringable

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

    this.invokeOptions = InvokeOptions.create({
      context,
      operation,
      queryArg: 'queryArg'
    })
  }

  static create(args: EndpointArgs): Endpoint {
    return new Endpoint(args)
  }

  toString(): string {
    return `const ${toEndpointName(this.operation)} = async (queryArg) => {
      const { data, error } = await supabaseClient.functions.invoke(
        ${toPathTemplate(this.operation.path, 'queryArg')}, ${
      this.invokeOptions
    })
    
      if (error) {
        throw error
      }
    
      return ${this.responseModel}.parse(data)
    }`
  }
}

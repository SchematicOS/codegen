import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { Stringable } from '@schematicos/types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import { toEndpointName } from 'generate/helpers/naming.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'
import { InvokeOptions } from './InvokeOptions.ts'
import { toOperationArg } from 'typescript/helpers/toOperationArg.ts'
import { toInferredType } from 'typescript/toInferredType.ts'

export type EndpointArgs = {
  context: CoreContext
  settings: OperationSettings
  operation: OasOperation
}

export class Endpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  settings: OperationSettings
  invokeOptions: InvokeOptions
  argName: string
  queryArg: Stringable = ''
  validateAndReturn: Stringable = ''

  private constructor({ context, operation, settings }: EndpointArgs) {
    super({ context })

    this.operation = operation
    this.settings = settings
    this.argName = 'args'

    const destinationPath = settings.getExportPath()

    this.invokeOptions = InvokeOptions.create({
      context,
      operation,
      queryArg: this.argName
    })

    const responseSchema = this.operation
      .toSuccessResponse()
      ?.resolve()
      .toSchema()

    if (responseSchema) {
      const responseModel = context.toTypeSystem({
        value: responseSchema,
        required: true,
        destinationPath
      })

      this.validateAndReturn = `return ${responseModel}.parse(data)`
    }

    const pathParams = this.operation.parameters
      ?.map(param => param.resolve())
      .filter(param => param.location === 'path')

    if (pathParams?.length || this.operation.requestBody) {
      const endpointArg = toOperationArg({
        context,
        destinationPath,
        operation
      })

      const endpointArgType = toInferredType(endpointArg.identifier)

      this.register({
        definitions: [endpointArg, endpointArgType],
        destinationPath
      })

      this.register({
        imports: { 'lib/supabase': ['supabaseClient'] },
        destinationPath
      })

      this.queryArg = `${this.argName}: ${endpointArgType.identifier}`
    }
  }

  static create(args: EndpointArgs): Endpoint {
    return new Endpoint(args)
  }

  toString(): string {
    const apiPath = toPathTemplate(this.operation.path, this.argName)
    const endpointName = toEndpointName(this.operation)

    const response = this.validateAndReturn ? 'data, error' : 'error'

    return `export const ${endpointName} = async (${this.queryArg}) => {
      const { ${response} } = await supabaseClient.functions.invoke(${apiPath}, ${this.invokeOptions})
    
      if (error) {
        throw error
      }
    
      ${this.validateAndReturn}
    }
`
  }
}

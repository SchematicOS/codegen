import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { Stringable } from 'types'
import type { OasOperation } from 'parse/elements/Operation.ts'
import { OasVoid } from 'parse/elements/schema/Void.ts'
import { toEndpointName } from 'generate/helpers/naming.ts'
import { toPathTemplate } from 'typescript/helpers/toPathTemplate.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import { capitalize } from 'generate/helpers/strings.ts'

export type QueryEndpointArgs = {
  context: CoreContext
  settings: OperationSettings
  operation: OasOperation
}

export class QueryEndpoint extends SchematicBase implements Stringable {
  operation: OasOperation
  settings: OperationSettings
  responseModel: Stringable
  pathParams: OasParameter[]
  tags: string[]

  private constructor({ context, operation, settings }: QueryEndpointArgs) {
    super({ context })

    this.operation = operation
    this.settings = settings
    this.tags = operation.tags?.map(tag => `'${tag}'`) ?? []

    const destinationPath = settings.getExportPath()

    const responseSchema = this.operation
      .toSuccessResponse()
      ?.resolve()
      .toSchema()

    this.responseModel = context.toTypeSystem({
      value: responseSchema ?? OasVoid.empty(context),
      required: true,
      destinationPath
    })

    this.pathParams =
      this.operation.parameters
        ?.map(param => param.resolve())
        .filter(param => param.location === 'path') ?? []

    this.register({
      imports: { '@tanstack/react-query': 'useQuery' },
      destinationPath
    })
  }

  static create({
    context,
    operation,
    settings
  }: QueryEndpointArgs): QueryEndpoint {
    return new QueryEndpoint({ context, operation, settings })
  }

  toString(): string {
    const queryFnName = `${toEndpointName(this.operation)}Fn`
    const pathParamNames = this.pathParams.map(param => param.name)
    const hookName = `use${capitalize(queryFnName)}`
    const hookArgs = pathParamNames.map(name => `${name}: string | undefined`)

    return `const ${queryFnName} = async (${hookArgs.join(', ')}) => {
      const res = await fetch(
        ${toPathTemplate(this.operation.path)},
        {
          method: '${this.operation.method.toUpperCase()}',
        }
      )

      const data = await res.json()
    
      return ${this.responseModel}.parse(data)
    }

    export const ${hookName} = (${hookArgs.join(', ')}) => {
      const result = useQuery({
        queryKey: [${this.tags.concat(pathParamNames).join(', ')}],
        queryFn: () => ${queryFnName}(${pathParamNames.join(', ')}),
        enabled: Boolean(${pathParamNames.join(' && ')})
      })

      return result
    }
`
  }
}

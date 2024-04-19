import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type { OasOperationData, Stringable } from '@schematicos/types'

type QueryFnArgs = {
  context: CoreContext
  operation: OasOperationData
  settings: OperationSettings
}

export class QueryFn extends SchematicBase implements Stringable {
  operation: OasOperationData
  settings: OperationSettings

  private constructor({ context, operation, settings }: QueryFnArgs) {
    super({ context })

    this.operation = operation
    this.settings = settings
  }

  static create({ context, operation, settings }: QueryFnArgs): QueryFn {
    return new QueryFn({ context, operation, settings })
  }

  toString(): string {
    return `IMPLEMENT ME: QueryFn.toString()`
  }
}

export const temp = `
const getDeploymentInfo = async (deploymentId: string) => {
  const { data, error } = await supabaseClient.functions.invoke(
    deployments/info/{deploymentId},
    {
      method: 'GET'
    }
  )

  if (error) {
    throw error
  }

  return denoDeploymentModel.parse(data)
}
`

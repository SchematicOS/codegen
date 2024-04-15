import type { RtkEndpoint } from './RtkEndpoint.ts'
import type { GenerateContext } from 'generate/lib/GenerateContext.ts'
import { Import } from 'generate/elements/Import.ts'
import type { TransformerSettings } from 'generate/lib/Settings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'

type RtkQueryContainerProps = {
  context: GenerateContext
  operations: RtkEndpoint[]
  transformerSettings: TransformerSettings
}

export class RtkQueryContainer extends SchematicBase implements Stringable {
  transformerSettings: TransformerSettings

  private constructor({
    context,
    operations,
    transformerSettings
  }: RtkQueryContainerProps) {
    super({ context, children: operations })

    this.transformerSettings = transformerSettings

    this.register()
  }

  static create(args: RtkQueryContainerProps):RtkQueryContainer {
    return new RtkQueryContainer(args)
  }

  register() {
    const destinationPath = this.transformerSettings.getExportPath()

    this.context.registerImport({
      importItem: Import.create('features/api/baseApi', { baseApi: 'api' }),
      destinationPath
    })
  }

  toString():string {
    return `export const injectedRtkApi = api.injectEndpoints({
      endpoints: (build) => ({${this.renderChildren(',\n')}}),
      overrideExisting: false
    })`
  }
}

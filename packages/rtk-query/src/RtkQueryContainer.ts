import type { RtkEndpoint } from './RtkEndpoint.ts'
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'
import { Import } from 'jsr:@schematicos/generate@0.0.2/Import'
import type { TransformerSettings } from 'jsr:@schematicos/generate@0.0.2/Settings'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.2/SchematicBase'
import type { Stringable } from 'npm:@schematicos/types@0.0.34'

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

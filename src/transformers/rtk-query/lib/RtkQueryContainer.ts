import type { RtkEndpoint } from './RtkEndpoint.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { TransformerSettings } from 'generate/settings/TransformerSettings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'
import { Import } from 'generate/elements/Import.ts'

type RtkQueryContainerProps = {
  context: CoreContext
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

    this.register({
      imports: [
        Import.create('@reduxjs/toolkit/query/react', [
          'createApi',
          'fetchBaseQuery'
        ])
      ],
      destinationPath: this.transformerSettings.getExportPath()
    })
  }

  static create(args: RtkQueryContainerProps): RtkQueryContainer {
    return new RtkQueryContainer(args)
  }

  toString(): string {
    return `export const injectedRtkApi = createApi({
      baseQuery: fetchBaseQuery({ baseUrl: '/' }),
      endpoints: (build) => ({${this.renderChildren(',\n')}}),
      overrideExisting: false
    })`
  }
}

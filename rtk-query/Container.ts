import type { CoreContext } from '../context/CoreContext.ts'
import type { TransformerSettings } from '../settings/TransformerSettings.ts'
import { SchematicBase } from '../dsl/SchematicBase.ts'
import type { Stringable } from '../schematic-types/stringable.ts'

type RtkQueryContainerProps = {
  context: CoreContext
  operations: Stringable[]
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
      imports: {
        '@reduxjs/toolkit/query/react': ['createApi', 'fetchBaseQuery']
      },
      destinationPath: this.transformerSettings.getExportPath({
        appendFileName: true
      })
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

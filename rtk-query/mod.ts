import type { TransformerArgs } from '../schematic-types/plugins.ts'
import { RtkEndpoint } from './Endpoint.ts'
import { RtkQueryContainer } from './Container.ts'
import { withDescription } from '../typescript/withDescription.ts'

export const transform = ({
  context,
  transformerSettings
}: TransformerArgs) => {
  const operations = context.schemaModel.operations
    .map(operation => {
      const operationSettings = transformerSettings.getOperationSettings({
        path: operation.path,
        method: operation.method
      })

      return {
        operation,
        operationSettings
      }
    })
    .filter(({ operationSettings }) => operationSettings.isSelected())
    .map(({ operation, operationSettings }, index) => {
      console.log(
        `${index}. `.padEnd(5),
        operation.method.toUpperCase().padEnd(8),
        operation.path
      )

      return withDescription(
        RtkEndpoint.create({
          context,
          operation,
          operationSettings
        }),
        operation.description
      )
    })

  const rtkContainer = RtkQueryContainer.create({
    context,
    transformerSettings,
    operations
  })

  context.register({
    content: rtkContainer,
    destinationPath: transformerSettings.getExportPath({ appendFileName: true })
  })
}

export default transform

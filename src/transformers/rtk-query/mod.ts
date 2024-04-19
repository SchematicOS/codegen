import type { TransformerArgs, Transformer } from 'generate/types.ts'
import { RtkEndpoint } from './lib/Endpoint.ts'
import { RtkQueryContainer } from './lib/Container.ts'

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

      return RtkEndpoint.create({
        context,
        operation,
        operationSettings
      })
    })

  const rtkContainer = RtkQueryContainer.create({
    context,
    transformerSettings,
    operations
  })

  context.register({
    content: rtkContainer,
    destinationPath: transformerSettings.getExportPath()
  })
}

const transformer: Transformer = {
  id: '@schematicos/rtk-query',
  transform
}

export default transformer

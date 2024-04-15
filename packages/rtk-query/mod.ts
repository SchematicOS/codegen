import type { TransformerArgs, Transformer } from 'jsr:@schematicos/generate@0.0.2/types'
import { RtkEndpoint } from './src/RtkEndpoint.ts'
import { RtkQueryContainer } from './src/RtkQueryContainer.ts'


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
    .map(({ operation, operationSettings }) => {
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

  context.registerContent({
    content: rtkContainer,
    destinationPath: transformerSettings.getExportPath()
  })
}



const transformer: Transformer = {
  id: '@schematicos/rtk-query',
  transform
}

export default transformer

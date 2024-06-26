import type { TransformerArgs } from '../schematic-types/plugins.ts'
import { Endpoint } from './Endpoint.ts'

export const transform = ({
  context,
  transformerSettings
}: TransformerArgs) => {
  context.schemaModel.operations
    .map(operation => {
      const settings = transformerSettings.getOperationSettings({
        path: operation.path,
        method: operation.method
      })

      return {
        operation,
        settings
      }
    })
    .filter(({ settings }) => settings.isSelected())
    .forEach(({ operation, settings }, index) => {
      console.log(
        `${index}. `.padEnd(5),
        operation.method.toUpperCase().padEnd(8),
        operation.path
      )

      const endpoint = Endpoint.create({
        context,
        operation,
        settings
      })

      context.register({
        content: endpoint,
        destinationPath: settings.getExportPath()
      })
    })
}

export default transform

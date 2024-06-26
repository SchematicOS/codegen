import type { TransformerArgs } from '../schematic-types/plugins.ts'
import { QueryEndpoint } from './QueryEndpoint.ts'
import { match } from 'ts-pattern'

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

      match(operation)
        .with({ method: 'get' }, matched => {
          const endpoint = QueryEndpoint.create({
            context,
            operation: matched,
            settings
          })

          context.register({
            content: endpoint,
            destinationPath: settings.getExportPath()
          })
        })
        .otherwise(() => {})
    })
}

export default transform

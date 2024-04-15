import type { Transformer, TransformerArgs } from 'jsr:@schematicos/generate@0.0.2/types'
import { FormContainer } from './src/FormContainer.ts'

export const transform = ({
  context,
  transformerSettings
}: TransformerArgs) => {
  context.schemaModel.operations
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
    .filter(({ operation, operationSettings }) => {
      if (!['post', 'put'].includes(operation.method.toLocaleLowerCase())) {
        return false
      }

      return operationSettings.isSelected()
    })
    // When generattion does not occur, we want to return the reason
    // to display to user. Probably inside Filter Panel or something
    .map(({ operation, operationSettings }) => {
      return FormContainer.create({
        context,
        operationSettings,
        operation
      })
    })
    .filter((formContainer): formContainer is FormContainer => Boolean( formContainer ))
    .forEach(formContainer => {
      context.registerContent({
        content: formContainer,
        destinationPath: formContainer.operationSettings.getExportPath()
      })
    })
}


const zodTypeSystem: Transformer = {
  id: '@schematicos/mui-joy-forms',
  transform
}

export default zodTypeSystem

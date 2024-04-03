import {
  capitalize,
  useTransformer,
  File,
  Value,
  isRef
} from '@schematicos/generate'
import { FormContainer } from '@/components/FormContainer.tsx'
import { FormFieldReact } from '@/components/FormField.tsx'
import { OasOperation, defaultExportPath } from '@schematicos/types'
import { camelCase } from 'lodash'
import { match } from 'ts-pattern'

export const MuiForms = () => {
  const { schemaModel, settingsConfig, resolveRef } = useTransformer()

  // TODO: we want to be able to apply filters and specify
  // output file paths
  const forms = schemaModel.operations
    .filter(operation => {
      const { path, method } = operation

      if (!['post', 'put'].includes(method.toLocaleLowerCase())) {
        return false
      }

      return (
        !settingsConfig ||
        settingsConfig.transformer?.operations?.[path]?.[method]?.selected
      )
    })
    // When generattion does not occur, we want to return the reason
    // to display to user. Probably inside Filter Panel or something
    .map(operation => {
      const { requestBody, path, method } = operation

      if (!requestBody) {
        console.log(`${operation.path} ${operation.method} has no requestBody`)
        return
      }

      const { content } = isRef(requestBody)
        ? resolveRef(requestBody)
        : requestBody

      const bodySchema = content['application/json']?.schema

      const bodySchemaValue = match(bodySchema)
        .with({ schematicType: 'schema' }, matched => {
          return matched
        })
        .with({ schematicType: 'ref' }, matched => {
          return resolveRef(matched)
        })
        .otherwise(() => undefined)

      if (!bodySchemaValue) {
        console.log(`${operation.path} ${operation.method} has no body schema`)
        return
      }

      if (bodySchemaValue.type !== 'object') {
        console.log(
          `${operation.path} ${operation.method} body schema is not an object`
        )
        return
      }

      const { properties } = bodySchemaValue

      if (!properties) {
        console.log(
          `${operation.path} ${operation.method} body schema has no properties`
        )
        return
      }

      const destination =
        settingsConfig?.transformer?.operations?.[path]?.[method]?.exportPath ??
        settingsConfig?.exportPath ??
        defaultExportPath

      return (
        <File key={`${path}-${method}`} destination={destination}>
          <FormContainer
            key={`${operation.path}${operation.method}`}
            formName={toFormName(operation)}
            zodFormModel={<Value key="key" value={bodySchemaValue} required />}
          >
            {Object.keys(properties).map(fieldName => (
              <FormFieldReact key={fieldName} fieldName={fieldName} />
            ))}
          </FormContainer>
        </File>
      )
    })
    .filter((item): item is JSX.Element => Boolean(item))

  return <>{forms}</>
}

const toFormName = (operation: OasOperation) => {
  const verb = match(operation.method)
    .with('post', () => 'Create')
    .with('put', () => 'Update')
    .otherwise(matched => matched)

  return `${capitalize(verb)}${capitalize(camelCase(operation.path))}`
}

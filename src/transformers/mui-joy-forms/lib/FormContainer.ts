import { FormField } from './FormField.ts'
import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import { Import } from 'generate/elements/Import.ts'
import { capitalize } from 'generate/helpers/strings.ts'
import { isRef } from 'generate/helpers/ref.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import type {
  OasObjectData,
  OasOperationData,
  Stringable
} from '@schematicos/types'
import camelCase from 'lodash-es/camelCase.js'
import { match } from 'ts-pattern'

type FormContainerArgs = {
  context: GenerateContext
  operation: OasOperationData
  operationSettings: OperationSettings
}

type FormContainerConstructorArgs = {
  context: GenerateContext
  operation: OasOperationData
  value: OasObjectData
  operationSettings: OperationSettings
}

export class FormContainer extends SchematicBase implements Stringable {
  formName: string
  value: OasObjectData
  zodFormModel: Stringable
  operationSettings: OperationSettings

  private constructor({
    context,
    operation,
    value,
    operationSettings
  }: FormContainerConstructorArgs) {
    super({ context })

    this.value = value
    this.operationSettings = operationSettings
    this.formName = toFormName(operation)

    this.zodFormModel = context.toTypeSystem({
      destinationPath: operationSettings.getExportPath(),
      value,
      required: true
    })

    this.children = toFormFields({
      context,
      operationSettings: this.operationSettings,
      formValue: this.value
    })

    this.register({
      imports: [
        Import.create('react', { default: 'React' }),
        Import.create('zod', 'z'),
        Import.create('@mui/joy/Box', { default: 'Box' }),
        Import.create('react-hook-form', ['useForm', 'Controller']),
        Import.create('@hookform/resolvers/zod', 'zodResolver'),
        Import.create('@mui/joy/Button', { default: 'Button' })
      ],
      destinationPath: this.operationSettings.getExportPath()
    })
  }

  static create({
    context,
    operation,
    operationSettings
  }: FormContainerArgs): FormContainer | undefined {
    const value = toBodySchemaValue({ context, operation })

    if (!value) {
      context.report({
        location: 'operation',
        method: operation.method,
        path: operation.path,
        message: 'No body schema found'
      })

      // @TODO: Would creating an object with an invalid status work better than returning undefined?
      return
    }

    return new FormContainer({ context, operation, value, operationSettings })
  }

  toString(): string {
    return `export const ${this.formName} = () => {
      const { control, handleSubmit } = useForm({
        resolver: zodResolver(${this.zodFormModel})
      })

      const onSubmit = () => {
        console.log('onSubmit')
      }

      return (
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          flex={1}
          onSubmit={event => {
            event.preventDefault()

            void handleSubmit(onSubmit)(event)
          }}
        >
          ${this.renderChildren('\n')}
          <Box display="flex" flexDirection="column" gap="16px" p="8px">
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      )
    }\n`
  }
}

type FormContainerInnerArgs = {
  context: GenerateContext
  formName: string
  value: OasObjectData
  zodFormModel: Stringable
}

export class FormContainerInner extends SchematicBase implements Stringable {
  formName: string
  value: OasObjectData
  zodFormModel: Stringable

  constructor({
    context,
    formName,
    value,
    zodFormModel
  }: FormContainerInnerArgs) {
    super({ context })

    this.formName = formName
    this.value = value
    this.zodFormModel = zodFormModel
  }
}

type ToFormFieldsArgs = {
  context: GenerateContext
  operationSettings: OperationSettings
  formValue: OasObjectData
}

const toFormFields = ({
  context,
  operationSettings,
  formValue
}: ToFormFieldsArgs) => {
  const { properties } = formValue

  const fields = Object.keys(properties ?? []).map(fieldName => {
    return FormField.create({
      context,
      operationSettings,
      fieldName
    })
  })

  return fields
}

const toFormName = (operation: OasOperationData) => {
  const verb = match(operation.method)
    .with('post', () => 'Create')
    .with('put', () => 'Update')
    .otherwise(matched => matched)

  return `${capitalize(verb)}${capitalize(camelCase(operation.path))}`
}

type ToBodySchemaValueArgs = {
  context: GenerateContext
  operation: OasOperationData
}

const toBodySchemaValue = ({ context, operation }: ToBodySchemaValueArgs) => {
  const { requestBody, path, method } = operation

  if (!requestBody) {
    console.log(`${path} ${method} has no requestBody`)
    return
  }

  const { content } = isRef(requestBody)
    ? context.resolveRef(requestBody)
    : requestBody

  const bodySchema = content['application/json']?.schema

  const bodySchemaValue = match(bodySchema)
    .with({ schematicType: 'schema' }, matched => matched)
    .with({ schematicType: 'ref' }, matched => context.resolveRef(matched))
    .otherwise(() => undefined)

  if (!bodySchemaValue) {
    console.log(`${path} ${method} has no body schema`)
    return
  }

  if (bodySchemaValue.type !== 'object') {
    console.log(`${path} ${method} body schema is not an object`)
    return
  }

  return bodySchemaValue
}

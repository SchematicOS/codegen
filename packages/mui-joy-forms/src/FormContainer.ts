import { FormField } from './FormField.ts'
import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.2/SchematicBase'
import { Import } from 'jsr:@schematicos/generate@0.0.2/Import'
import { capitalize } from 'jsr:@schematicos/generate@0.0.2/strings'
import { isRef } from 'jsr:@schematicos/generate@0.0.2/ref'
import type { OperationSettings } from 'jsr:@schematicos/generate@0.0.2/Settings'
import type { OasObject, OasOperation, Stringable } from 'npm:@schematicos/types@0.0.34'
import camelCase from 'npm:lodash-es@4.17.21/camelCase.js'
import { match } from 'npm:ts-pattern@5.1.1'

type FormContainerArgs = {
  context: GenerateContext
  operation: OasOperation
  operationSettings: OperationSettings
}

type FormContainerConstructorArgs = {
  context: GenerateContext
  operation: OasOperation
  value: OasObject
  operationSettings: OperationSettings
}

export class FormContainer extends SchematicBase implements Stringable {
  formName: string
  value: OasObject
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

    this.register()
  }

  static create({ context, operation, operationSettings }: FormContainerArgs):FormContainer | undefined {
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

  register() {
    const destinationPath = this.operationSettings.getExportPath()

    this.context.registerImports({
      importItems: [
        Import.create('react', { default: 'React' }),
        Import.create('zod', 'z'),
        Import.create('@mui/joy/Box', { default: 'Box' }),
        Import.create('react-hook-form', ['useForm', 'Controller']),
        Import.create('@hookform/resolvers/zod', 'zodResolver'),
        Import.create('@mui/joy/Button', { default: 'Button' })
      ],
      destinationPath
    })
  }

  toString():string {
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
  value: OasObject
  zodFormModel: Stringable
}

export class FormContainerInner extends SchematicBase implements Stringable {
  formName: string
  value: OasObject
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
  formValue: OasObject
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

const toFormName = (operation: OasOperation) => {
  const verb = match(operation.method)
    .with('post', () => 'Create')
    .with('put', () => 'Update')
    .otherwise(matched => matched)

  return `${capitalize(verb)}${capitalize(camelCase(operation.path))}`
}

type ToBodySchemaValueArgs = {
  context: GenerateContext
  operation: OasOperation
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

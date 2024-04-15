import type { GenerateContext } from 'jsr:@schematicos/generate@0.0.2/GenerateContext'
import { Import } from 'jsr:@schematicos/generate@0.0.2/Import'
import type { OperationSettings } from 'jsr:@schematicos/generate@0.0.2/Settings'
import { SchematicBase } from 'jsr:@schematicos/generate@0.0.2/SchematicBase'
import type { Stringable } from 'npm:@schematicos/types@0.0.34'

type FormFieldArgs = {
  context: GenerateContext
  operationSettings: OperationSettings
  fieldName: string
}

export class FormField extends SchematicBase implements Stringable {
  fieldName: string
  operationSettings: OperationSettings

  private constructor({
    context,
    operationSettings,
    fieldName
  }: FormFieldArgs) {
    super({ context })

    this.operationSettings = operationSettings
    this.fieldName = fieldName

    this.register()
  }

  static create(args: FormFieldArgs) {
    return new FormField(args)
  }

  register() {
    const destinationPath = this.operationSettings.getExportPath()

    this.context.registerImports({
      importItems: [
        Import.create('react-hook-form', 'Controller'),
        Import.create('@mui/joy/FormLabel', { default: 'FormLabel' }),
        Import.create('@mui/joy/Input', { default: 'Input' }),
        Import.create('@mui/joy/FormControl', { default: 'FormControl' }),
        Import.create('@mui/joy/FormHelperText', { default: 'FormHelperText' })
      ],
      destinationPath
    })
  }

  toString() {
    return `<Controller
    name="${this.fieldName}"
    control={control}
    render={({ field, fieldState }) => (
      <FormControl>
        <FormLabel>${this.fieldName}</FormLabel>
        <Input {...field} />
        {fieldState.error?.message ? (
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        ) : null}
      </FormControl>
    )}
    />`
  }
}

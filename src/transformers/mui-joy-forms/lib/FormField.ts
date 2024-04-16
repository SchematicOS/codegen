import type { GenerateContext } from 'generate/context/GenerateContext.ts'
import { Import } from 'generate/elements/Import.ts'
import type { OperationSettings } from 'generate/settings/OperationSettings.ts'
import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { Stringable } from '@schematicos/types'

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

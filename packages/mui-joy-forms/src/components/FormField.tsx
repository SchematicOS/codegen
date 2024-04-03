import { useRegisterImports } from '@schematicos/generate'
import { FC } from 'react'

type FormFieldReactProps = {
  fieldName: string
}

export const FormFieldReact: FC<FormFieldReactProps> = ({ fieldName }) => {
  useRegisterImports({
    'react-hook-form': ['Controller'],
    '@mui/joy/FormLabel': [{ default: 'FormLabel' }],
    '@mui/joy/Input': [{ default: 'Input' }],
    '@mui/joy/FormControl': [{ default: 'FormControl' }],
    '@mui/joy/FormHelperText': [{ default: 'FormHelperText' }]
  })

  return `<Controller
    name="${fieldName}"
    control={control}
    render={({ field, fieldState }) => (
      <FormControl>
        <FormLabel>${fieldName}</FormLabel>
        <Input {...field} />
        {fieldState.error?.message ? (
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        ) : null}
      </FormControl>
    )}
    />`
}

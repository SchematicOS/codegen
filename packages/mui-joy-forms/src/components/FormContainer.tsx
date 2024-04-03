import { $, useRegisterImports } from '@schematicos/generate'
import { FC, ReactNode } from 'react'

type FormContainerProps = {
  formName: string
  children: ReactNode
  zodFormModel: ReactNode
}

export const FormContainer: FC<FormContainerProps> = ({
  formName,
  children,
  zodFormModel
}) => {
  useRegisterImports({
    zod: ['z'],
    '@mui/joy/Box': [{ default: 'Box' }],
    'react-hook-form': ['useForm', 'Controller'],
    '@hookform/resolvers/zod': ['zodResolver'],
    '@mui/joy/Button': [{ default: 'Button' }]
  })

  const formContainers = $`export const ${formName} = () => {
    const { control, handleSubmit } = useForm({
      resolver: zodResolver(${zodFormModel})
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
        ${children}
        <Box display="flex" flexDirection="column" gap="16px" p="8px">
          <Button type="submit">Submit</Button>
        </Box>
      </Box>
    )
  }\n`

  return formContainers
}

import { RtkQueryContainer } from '@/components/RtkQueryContainer.tsx'
import { elements, File, useTransformer } from '@schematicos/generate'
import { OasOperation, defaultExportPath } from '@schematicos/types'
import { RtkEndpoint } from '@/components/RtkEndpoint.tsx'
import { ReactNode } from 'react'

const { List } = elements

export const RtkEndpoints = () => {
  const ctx = useTransformer()
  const { schemaModel, settingsConfig } = ctx

  const destination = settingsConfig?.exportPath ?? defaultExportPath

  const endpoints: ReactNode[] = schemaModel.operations
    .filter(operation => {
      const { path, method } = operation

      return (
        !settingsConfig ||
        settingsConfig.transformer?.operations?.[path]?.[method]?.selected
      )
    })
    .map((operation: OasOperation) => (
      <RtkEndpoint
        key={`${operation.path}-${operation.method}`}
        operation={operation}
      />
    ))

  return (
    <File destination={destination}>
      <RtkQueryContainer>
        <List separator={`,`}>{endpoints}</List>
      </RtkQueryContainer>
    </File>
  )
}

import { $, useRegisterImports } from '@schematicos/generate'
import { ReactNode } from 'react'

type RtkQueryContainerProps = {
  children: ReactNode
}

export const RtkQueryContainer = ({ children }: RtkQueryContainerProps) => {
  useRegisterImports({
    'features/api/baseApi': [{ baseApi: 'api' }]
  })

  return $`export const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({${children}}),
    overrideExisting: false
  })\n`
}

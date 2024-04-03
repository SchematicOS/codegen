import { TransformerContext } from '@/lib/TransformerProvider.tsx'
import { useContext } from 'react'

export const useTransformer = () => {
  const context = useContext(TransformerContext)

  if (context === undefined) {
    throw new Error('useTransformer must be used within a TransformerProvider')
  }

  return context
}

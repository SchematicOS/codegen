import { FC, ReactNode, createContext, useContext } from 'react'
import { GenerateContext } from '@/lib/GenerateContext.ts'

type GenerateState = {
  ctx: GenerateContext
}

const GenerateContextItem = createContext<GenerateState | undefined>(undefined)

type GenerateProviderProps = GenerateState & {
  children: ReactNode
}

export const GenerateProvider: FC<GenerateProviderProps> = ({
  ctx,
  children
}) => (
  <GenerateContextItem.Provider value={{ ctx }}>
    {children}
  </GenerateContextItem.Provider>
)

export const useGenerate = () => {
  const context = useContext(GenerateContextItem)
  if (context === undefined) {
    throw new Error('useGenerate must be used within a GenerateProvider')
  }
  return context
}

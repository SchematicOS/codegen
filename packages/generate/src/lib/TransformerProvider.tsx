import { RefToResolved } from '@/lib/types.ts'
import {
  ComponentsConfigType,
  OasRef,
  OasRoot,
  TransformerConfigType,
  LoadedTypeSystem,
  ImportName
} from '@schematicos/types'
import { ReactNode, createContext } from 'react'

type RegisterImportsArgs = {
  imports: Record<string, ImportName[]>
  destination: string
}

export type TransformerSettingsConfigType = {
  schemaHash?: string
  exportPath?: string
  transformer?: TransformerConfigType
  components?: ComponentsConfigType
}

export type TransformerContextType = {
  schemaModel: OasRoot
  settingsConfig: TransformerSettingsConfigType
  registerImports: ({ imports, destination }: RegisterImportsArgs) => void
  resolveRef: <T extends OasRef>(arg: T) => RefToResolved<T>
  typeSystem: LoadedTypeSystem
}

export const TransformerContext = createContext<
  TransformerContextType | undefined
>(undefined)

type TransformerState = {
  ctx: TransformerContextType
}

type TransformerProviderProps = TransformerState & {
  children: ReactNode
}

export const TransformerProvider = ({
  ctx,
  children
}: TransformerProviderProps) => (
  <TransformerContext.Provider value={{ ...ctx }}>
    {children}
  </TransformerContext.Provider>
)

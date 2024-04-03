import { elements } from '@/lib/elements.ts'
import { FC, ReactNode, createContext, useContext } from 'react'

const { File: FileTag } = elements

type FileProps = {
  destination: string
  children: ReactNode
}

export const File = ({ destination, children }: FileProps) => (
  <FileTag destination={destination}>
    <FileProvider destination={destination}>{children}</FileProvider>
  </FileTag>
)

type FileState = {
  destination: string
}

const FileContext = createContext<FileState | undefined>(undefined)

type FileProviderProps = FileState & {
  children: ReactNode
}

export const FileProvider: FC<FileProviderProps> = ({
  destination,
  children
}) => (
  <FileContext.Provider value={{ destination }}>
    {children}
  </FileContext.Provider>
)

export const useFile = () => {
  const context = useContext(FileContext)

  if (context === undefined) {
    throw new Error('useFile must be used within a File element')
  }

  return context
}

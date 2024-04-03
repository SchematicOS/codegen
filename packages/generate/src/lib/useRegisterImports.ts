import { useFile } from '@/components/File/File.tsx'
import { ImportName } from '@schematicos/types'
import { useTransformer } from '@/lib/useTransformer.tsx'

export const useRegisterImports = (imports: Record<string, ImportName[]>) => {
  const { registerImports } = useTransformer()
  const { destination } = useFile()

  registerImports({ imports, destination })
}

export const useRegisterImportsLazy = () => {
  const { registerImports } = useTransformer()
  const { destination } = useFile()

  return (imports: Record<string, ImportName[]>) => {
    registerImports({ imports, destination })
  }
}

import { useFile } from '@/components/File/File.tsx'
import { Identifier } from '@/lib/Identifier.ts'
import { elements } from '@/lib/elements.ts'
import { ReactNode } from 'react'

type DefinitionProps = {
  identifier: Identifier
  children: ReactNode
}

const { Definition: DefinitionTag, TypeDefinition: TypeDefinitionTag } =
  elements

export const Definition = ({ identifier, children }: DefinitionProps) => {
  const { destination } = useFile()

  return (
    <DefinitionTag destination={destination} identifier={identifier}>
      <TypeDefinitionTag identifier={identifier}>{children}</TypeDefinitionTag>
    </DefinitionTag>
  )
}

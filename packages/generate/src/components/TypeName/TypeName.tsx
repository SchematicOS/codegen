import { Conversion } from '@/components/Conversion/Conversion.tsx'
import { Definition } from '@/components/Definition/Definition.tsx'
import { useFile } from '@/components/File/File.tsx'
import { Identifier } from '@/lib/Identifier.ts'
import { elements } from '@/lib/elements.ts'
import { capitalizeImportName } from '@/lib/strings.ts'
import { ReactNode } from 'react'

const { TypeName: TypeNameTag, Definition: DefinitionTag } = elements

type TypeNameProps = {
  identifier: Identifier
  children: ReactNode
}

export const TypeName = ({ identifier, children }: TypeNameProps) => {
  const { destination } = useFile()

  const tsIdentifier = identifier.convert({
    type: 'type',
    rename: capitalizeImportName
  })

  return (
    // TypeName should convert identifier to typescript
    // and add TS conversion to definitions
    <TypeNameTag identifier={tsIdentifier}>
      <Definition identifier={identifier}>{children}</Definition>
      <DefinitionTag destination={destination} identifier={tsIdentifier}>
        <Conversion tsIdentifier={tsIdentifier} zodIdentifier={identifier} />
      </DefinitionTag>
    </TypeNameTag>
  )
}

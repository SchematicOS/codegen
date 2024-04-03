import { Identifier } from '@/lib/Identifier.ts'
import { ImportName } from '@schematicos/types'
import { ReactNode } from 'react'

export type FileProps = {
  destination: string
}

export type ListProps = {
  wrapper?: 'object' | 'array'
  separator?: string
}

export type NameValueProps = {
  name: string
  parentPath?: string
}

export type DefinitionProps = {
  identifier: Identifier
  destination: string
}

export type ImportProps = {
  names: ImportName[]
  from: string
}

export type TypeDefinitionProps = {
  identifier: Identifier
}

export type TypeNameProps = {
  identifier: Identifier
}

type ChildrenProps = { children: ReactNode }

export type ElementsPropsMap = {
  [elements.File]: FileProps & ChildrenProps
  [elements.List]: ListProps & ChildrenProps
  [elements.NameValue]: NameValueProps & ChildrenProps
  [elements.Value]: ChildrenProps
  [elements.Definition]: DefinitionProps & ChildrenProps
  [elements.Import]: ImportProps
  [elements.TypeDefinition]: TypeDefinitionProps & ChildrenProps
  [elements.TypeName]: TypeNameProps & ChildrenProps
}

export const elements = {
  File: 'FILE' as const,
  List: 'LIST' as const,
  NameValue: 'NAME_VALUE' as const,
  Value: 'VALUE' as const,
  Definition: 'DEFINITION' as const,
  Import: 'IMPORT' as const,
  TypeDefinition: 'TYPE_DEFINITION' as const,
  TypeName: 'TYPE_NAME' as const
}

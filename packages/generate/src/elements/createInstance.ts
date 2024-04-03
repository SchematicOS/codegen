import { Container } from '@/elements/Container.ts'
import { match } from 'ts-pattern'
import { File, FileProps } from '@/elements/File.ts'
import { List, ListProps } from '@/elements/List.ts'
import { NameValue, NameValueProps } from '@/elements/NameValue.ts'
import { Value, ValueProps } from '@/elements/Value.ts'
import { Definition, DefinitionProps } from '@/elements/Definition.ts'
import { Import, ImportProps } from '@/elements/Import.ts'
import {
  TypeDefinition,
  TypeDefinitionProps
} from '@/elements/TypeDefinitions.ts'
import { TypeName, TypeNameProps } from '@/elements/TypeName.ts'
import { elements } from '@schematicos/generate'

export type Instance =
  | File
  | List
  | NameValue
  | Value
  | Definition
  | Import
  | TypeDefinition
  | TypeName

// TODO: Need make it easier to add new elements and catch missing elements
export const createInstance = (
  type: string,
  props: Record<string, any>,
  root: Container
) => {
  return match(type)
    .with(elements.File, () => new File(props as FileProps, root))
    .with(elements.List, () => new List(props as ListProps, root))
    .with(
      elements.NameValue,
      () => new NameValue(props as NameValueProps, root)
    )
    .with(elements.Value, () => new Value(props as ValueProps, root))
    .with(elements.Definition, () => {
      return new Definition(props as DefinitionProps, root)
    })
    .with(elements.TypeDefinition, () => {
      return new TypeDefinition(props as TypeDefinitionProps, root)
    })
    .with(elements.TypeName, () => {
      return new TypeName(props as TypeNameProps, root)
    })
    .with(elements.Import, () => new Import(props as ImportProps, root))
    .otherwise(() => {
      console.log('Unknown type:', type, props, root)
      throw new Error(`Unknown type: ${type}`)
    })
}

import type { EntityType } from '../languages/typescript/EntityType.ts'
import type { GenerateContext } from './context/GenerateContext.ts'
import type { TransformerSettings } from './settings/TransformerSettings.ts'
import type {
  OasSchema,
  OasSchemaRef,
  OasVoid,
  Stringable,
  OasComponentType,
  OasRef
} from '@schematicos/types'

export type TypeSystemArgs = {
  context: GenerateContext
  destinationPath: string
  value: OasSchema | OasVoid | OasSchemaRef
  required?: boolean
}

export type TypeSystemFn = ({
  value,
  required,
  destinationPath,
  context
}: TypeSystemArgs) => Stringable

export type TypeSystem = {
  id: string
  create: TypeSystemFn
  formatIdentifier: (name: string) => string
  type: EntityType
}

export type TransformerArgs = {
  context: GenerateContext
  transformerSettings: TransformerSettings
}

export type TransformerFn = ({
  context,
  transformerSettings
}: TransformerArgs) => void

export type Transformer = {
  id: string
  transform: TransformerFn
}

export type RefToResolved<T extends OasRef> = Extract<
  OasComponentType,
  { schematicType: T['refType'] }
>

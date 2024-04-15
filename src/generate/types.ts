import type { GenerateContext } from './lib/GenerateContext.ts'
import type { TransformerSettings } from './lib/Settings.ts'
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
  type: 'value' | 'type'
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

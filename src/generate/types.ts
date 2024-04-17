import type { EntityType } from '../languages/typescript/EntityType.ts'
import type { GenerateContext } from './context/GenerateContext.ts'
import type { TransformerSettings } from './settings/TransformerSettings.ts'
import type {
  OasSchemaData,
  OasSchemaRefData,
  OasVoid,
  Stringable,
  OasComponentType,
  OasRefData
} from '@schematicos/types'

export type TypeSystemArgs = {
  context: GenerateContext
  destinationPath: string
  value: OasSchemaData | OasVoid | OasSchemaRefData
  required?: boolean
}

export type TypeSystemFn = ({
  value,
  required,
  destinationPath,
  context
}: TypeSystemArgs) => Stringable

export type InferTypeArgs = {
  context: GenerateContext
  value: Stringable
}

export type InferTypeFn = ({ value, context }: InferTypeArgs) => Stringable

export type TypeSystem = {
  id: string
  create: TypeSystemFn
  inferType: InferTypeFn
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

export type RefToResolved<T extends OasRefData> = Extract<
  OasComponentType,
  { schematicType: T['refType'] }
>

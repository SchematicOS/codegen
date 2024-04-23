import type { EntityType } from 'typescript/lib/EntityType.ts'
import type { OasSchema } from 'parse/elements/schema/types.ts'
import type { CoreContext } from 'context/CoreContext.ts'
import type { TransformerSettings } from './settings/TransformerSettings.ts'
import type { Stringable, OasRefData } from '@schematicos/types'
import type { OasRef } from 'parse/elements/Ref.ts'
import type { OasResponse } from 'parse/elements/Response.ts'
import type { OasParameter } from 'parse/elements/Parameter.ts'
import type { OasExample } from 'parse/elements/Example.ts'
import type { OasRequestBody } from 'parse/elements/RequestBody.ts'
import type { OasHeader } from 'parse/elements/Header.ts'
import type { OasVoid } from 'parse/elements/schema/Void.ts'

export type TypeSystemArgs = {
  context: CoreContext
  destinationPath: string
  value: OasSchema | OasRef<'schema'> | OasVoid
  required: boolean | undefined
}

export type TypeSystemFn = ({
  value,
  required,
  destinationPath,
  context
}: TypeSystemArgs) => Stringable

export type InferTypeArgs = {
  context: CoreContext
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
  context: CoreContext
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

export type OasComponentType =
  | OasSchema
  | OasResponse
  | OasParameter
  | OasExample
  | OasRequestBody
  | OasHeader

export type RefToResolved<T extends OasRefData> = Extract<
  OasComponentType,
  { schematicType: T['refType'] }
>
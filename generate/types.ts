import type { EntityType } from '../typescript/EntityType.ts'
import type { OasSchema } from '../oasSchema/types.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { TransformerSettings } from '../settings/TransformerSettings.ts'
import type { Stringable } from '../schematicTypes/stringable.ts'
import type { OasRef } from '../oasElements/Ref.ts'
import type { OasResponse } from '../oasElements/Response.ts'
import type { OasParameter } from '../oasElements/Parameter.ts'
import type { OasExample } from '../oasElements/Example.ts'
import type { OasRequestBody } from '../oasElements/RequestBody.ts'
import type { OasHeader } from '../oasElements/Header.ts'
import type { OasVoid } from '../oasSchema/Void.ts'
import type { OasRefData } from '../oasTypes/ref.ts'

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

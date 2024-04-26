import type { EntityType } from '../typescript/EntityType.ts'
import type { OasSchema } from '../oas-schema/types.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import type { TransformerSettings } from '../settings/TransformerSettings.ts'
import type { Stringable } from '../schematic-types/stringable.ts'
import type { OasRef } from '../oas-elements/Ref.ts'
import type { OasResponse } from '../oas-elements/Response.ts'
import type { OasParameter } from '../oas-elements/Parameter.ts'
import type { OasExample } from '../oas-elements/Example.ts'
import type { OasRequestBody } from '../oas-elements/RequestBody.ts'
import type { OasHeader } from '../oas-elements/Header.ts'
import type { OasVoid } from '../oas-schema/Void.ts'
import type { OasRefData } from '../oas-types/ref.ts'

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

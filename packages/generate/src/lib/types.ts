import { Identifier } from '@/lib/Identifier.ts'
import { OasComponentType, OasRef, Stringable } from '@schematicos/types'

export type RefToResolved<T extends OasRef> = Extract<
  OasComponentType,
  { schematicType: T['refType'] }
>

export type DefinitionType = {
  identifier: Identifier
  renderedValue: Stringable
}

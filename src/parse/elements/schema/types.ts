import type { OasArray } from './Array.ts'
import type { OasBoolean } from './Boolean.ts'
import type { OasInteger } from './Integer.ts'
import type { OasNumber } from './Number.ts'
import type { OasObject } from './Object.ts'
import type { OasString } from './String.ts'
import type { OasUnknown } from './Unknown.ts'
import type { OasUnion } from './Union.ts'
import type { OasIntersection } from './Intersection.ts'

export type OasSchema =
  | OasArray
  | OasBoolean
  | OasInteger
  | OasNumber
  | OasObject
  | OasString
  | OasUnknown
  | OasUnion
  | OasIntersection

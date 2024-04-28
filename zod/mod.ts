import type { TypeSystem } from '../schematic-types/plugins.ts'
import { decapitalize } from '../helpers/strings.ts'
import { Zod } from './Zod.ts'
import { EntityType } from '../typescript/EntityType.ts'
import { ZodInferType } from './ZodInferType.ts'

const zodTypeSystem: TypeSystem = {
  id: '@schematicos/zod@0.0.1',
  create: args => Zod.create(args),
  inferType: args => ZodInferType.create(args),
  formatIdentifier: decapitalize,
  type: EntityType.create('value')
}

export default zodTypeSystem

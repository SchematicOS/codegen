import type { TypeSystem } from 'generate/types.ts'
import { decapitalize } from 'generate/helpers/strings.ts'
import { Zod } from './lib/Zod.ts'
import { EntityType } from 'typescript/EntityType.ts'
import { ZodInferType } from 'zod/lib/ZodInferType.ts'

const zodTypeSystem: TypeSystem = {
  id: '@schematicos/zod@0.0.1',
  create: args => Zod.create(args),
  inferType: args => ZodInferType.create(args),
  formatIdentifier: decapitalize,
  type: EntityType.create('value')
}

export default zodTypeSystem

import type { TypeSystem, TypeSystemArgs } from 'jsr:@schematicos/generate@0.0.14/types';
import { decapitalize } from 'jsr:@schematicos/generate@0.0.14/strings';
import { Zod } from './src/Zod.ts'

const zodTypeSystem: TypeSystem = {
  id: '@schematicos/zod@0.0.1',
  create: (args: TypeSystemArgs) => Zod.create(args),
  formatIdentifier: decapitalize,
  type: 'value' as const
}

export default zodTypeSystem

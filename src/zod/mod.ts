import type { TypeSystem, TypeSystemArgs } from 'generate/types.ts';
import { decapitalize } from 'generate/helpers/strings.ts';
import { Zod } from './lib/Zod.ts'

const zodTypeSystem: TypeSystem = {
  id: '@schematicos/zod@0.0.1',
  create: (args: TypeSystemArgs) => Zod.create(args),
  formatIdentifier: decapitalize,
  type: 'value' as const
}

export default zodTypeSystem

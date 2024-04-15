import type { Transformer, TypeSystem } from "generate/types.ts";
import { default as t_1 } from 'mui-joy-forms/mod.ts'
import { default as t_2 } from 'rtk-query/mod.ts'
import ts from 'zod/mod.ts'

type Transformers = {
  transformers: Transformer[]
  typeSystem: TypeSystem
}

const transformers: Transformers = {
  transformers: [t_1, t_2],
  typeSystem: ts
}

export default transformers

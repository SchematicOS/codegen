import { Transformer, TypeSystem } from "jsr:@schematicos/generate@0.0.2/types";
import { default as t_1 } from 'jsr:@schematicos/mui-joy-forms@0.0.3'
import { default as t_2 } from 'jsr:@schematicos/rtk-query@0.0.1'
import ts from 'jsr:@schematicos/zod@0.0.2'

type Transformers = {
  transformers: Transformer[]
  typeSystem: TypeSystem
}

const transformers: Transformers = {
  transformers: [t_1, t_2],
  typeSystem: ts
}

export default transformers

import { z } from 'zod'

export const methodValues = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
] as const

export const methodValuesNoTrace = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch'
]

export const method = z.enum([
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
])

export type Method =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace'

export const methodNoTrace = z.enum([
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch'
])

export type MethodNoTrace = z.infer<typeof methodNoTrace>

export const methods = z.array(method)

export type Methods = z.infer<typeof methods>

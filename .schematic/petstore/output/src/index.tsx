import { z } from 'zod'

export const order = z.object({
  id: z.number().int().optional(),
  petId: z.number().int().optional(),
  quantity: z.number().int().optional(),
  shipDate: z.string().optional(),
  /** Order Status */ status: z.string().optional(),
  complete: z.boolean().optional()
})
export const address = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional()
})
export const customer = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  address: z.array(address).optional()
})
export const category = z.object({
  id: z.number().int().optional(),
  name: z.string().optional()
})
export const user = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  /** User Status */ userStatus: z.number().int().optional()
})
export const tag = z.object({
  id: z.number().int().optional(),
  name: z.string().optional()
})
export const pet = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tag).optional(),
  /** pet status in the store */ status: z.string().optional()
})
export const apiResponse = z.object({
  code: z.number().int().optional(),
  type: z.string().optional(),
  message: z.string().optional()
})

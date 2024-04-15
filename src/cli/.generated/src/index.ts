export const address = z
  .object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional()
  })
  .optional()
export const category = z
  .object({ id: z.number().int().optional(), name: z.string().optional() })
  .optional()
export const tag = z
  .object({ id: z.number().int().optional(), name: z.string().optional() })
  .optional()
export const order = z
  .object({
    id: z.number().int().optional(),
    petId: z.number().int().optional(),
    quantity: z.number().int().optional(),
    shipDate: z.string().optional(),
    status: z.enum(['placed', 'approved', 'delivered']).optional(),
    complete: z.boolean().optional()
  })
  .optional()
export const customer = z
  .object({
    id: z.number().int().optional(),
    username: z.string().optional(),
    address: z.array(address.optional()).optional()
  })
  .optional()
export const user = z
  .object({
    id: z.number().int().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    userStatus: z.number().int().optional()
  })
  .optional()
export const pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string().optional(),
    category: category.optional(),
    photoUrls: z.array(z.string().optional()).optional(),
    tags: z.array(tag.optional()).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional()
  })
  .optional()
export const apiResponse = z
  .object({
    code: z.number().int().optional(),
    type: z.string().optional(),
    message: z.string().optional()
  })
  .optional()

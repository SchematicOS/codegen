import { pet, apiResponse, order } from 'src/index.tsx'
import { z } from 'zod'
import { supabaseClient } from 'lib/supabase'
import { customer } from 'src/schemas/Customer.ts'

export const postApiPetArgs = z.object({ body: pet })
export type PostApiPetArgs = z.infer<typeof postApiPetArgs>
export const putApiPetArgs = z.object({ body: pet })
export type PutApiPetArgs = z.infer<typeof putApiPetArgs>
export const getApiPetPetIdArgs = z.object({ petId: z.number().int() })
export type GetApiPetPetIdArgs = z.infer<typeof getApiPetPetIdArgs>
export const postApiPetPetIdArgs = z.object({
  petId: z.number().int(),
  name: z.string().optional(),
  status: z.string().optional()
})
export type PostApiPetPetIdArgs = z.infer<typeof postApiPetPetIdArgs>
export const deleteApiPetPetIdArgs = z.object({
  api_key: z.string().optional(),
  petId: z.number().int()
})
export type DeleteApiPetPetIdArgs = z.infer<typeof deleteApiPetPetIdArgs>
export const postApiPetPetIdUploadImageArgs = z.object({
  petId: z.number().int(),
  additionalMetadata: z.string().optional()
})
export type PostApiPetPetIdUploadImageArgs = z.infer<
  typeof postApiPetPetIdUploadImageArgs
>
export const postApiStoreOrderArgs = z.object({ body: order })
export type PostApiStoreOrderArgs = z.infer<typeof postApiStoreOrderArgs>
export const getApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export type GetApiStoreOrderOrderIdArgs = z.infer<
  typeof getApiStoreOrderOrderIdArgs
>
export const deleteApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export type DeleteApiStoreOrderOrderIdArgs = z.infer<
  typeof deleteApiStoreOrderOrderIdArgs
>
export const postApiUserArgs = z.object({ body: customer })
export type PostApiUserArgs = z.infer<typeof postApiUserArgs>
export const postApiUserCreateWithListArgs = z.object({
  body: z.array(customer)
})
export type PostApiUserCreateWithListArgs = z.infer<
  typeof postApiUserCreateWithListArgs
>
export const getApiUserUsernameArgs = z.object({ username: z.string() })
export type GetApiUserUsernameArgs = z.infer<typeof getApiUserUsernameArgs>
export const putApiUserUsernameArgs = z.object({
  username: z.string(),
  body: customer
})
export type PutApiUserUsernameArgs = z.infer<typeof putApiUserUsernameArgs>
export const deleteApiUserUsernameArgs = z.object({ username: z.string() })
export type DeleteApiUserUsernameArgs = z.infer<
  typeof deleteApiUserUsernameArgs
>

export const postApiPet = async (args: PostApiPetArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(`/pet`, {
    method: 'POST',
    body: args.body
  })

  if (error) {
    throw error
  }

  return pet.parse(data)
}

export const putApiPet = async (args: PutApiPetArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(`/pet`, {
    method: 'PUT',
    body: args.body
  })

  if (error) {
    throw error
  }

  return pet.parse(data)
}

export const getApiPetFindByStatus = async () => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/findByStatus`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(pet).parse(data)
}

export const getApiPetFindByTags = async () => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/findByTags`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(pet).parse(data)
}

export const getApiPetPetId = async (args: GetApiPetPetIdArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${args.petId}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return pet.parse(data)
}

export const postApiPetPetId = async (args: PostApiPetPetIdArgs) => {
  const { error } = await supabaseClient.functions.invoke(
    `/pet/${args.petId}`,
    { method: 'POST' }
  )

  if (error) {
    throw error
  }
}

export const deleteApiPetPetId = async (args: DeleteApiPetPetIdArgs) => {
  const { error } = await supabaseClient.functions.invoke(
    `/pet/${args.petId}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }
}

export const postApiPetPetIdUploadImage = async (
  args: PostApiPetPetIdUploadImageArgs
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${args.petId}/uploadImage`,
    { method: 'POST', body: args.body }
  )

  if (error) {
    throw error
  }

  return apiResponse.parse(data)
}

export const getApiStoreInventory = async () => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/inventory`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.record(z.string(), z.number().int()).parse(data)
}

export const postApiStoreOrder = async (args: PostApiStoreOrderArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/order`,
    { method: 'POST', body: args.body }
  )

  if (error) {
    throw error
  }

  return order.parse(data)
}

export const getApiStoreOrderOrderId = async (
  args: GetApiStoreOrderOrderIdArgs
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/order/${args.orderId}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return order.parse(data)
}

export const deleteApiStoreOrderOrderId = async (
  args: DeleteApiStoreOrderOrderIdArgs
) => {
  const { error } = await supabaseClient.functions.invoke(
    `/store/order/${args.orderId}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }
}

export const postApiUser = async (args: PostApiUserArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(`/user`, {
    method: 'POST',
    body: args.body
  })

  if (error) {
    throw error
  }

  return customer.parse(data)
}

export const postApiUserCreateWithList = async (
  args: PostApiUserCreateWithListArgs
) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/createWithList`,
    { method: 'POST', body: args.body }
  )

  if (error) {
    throw error
  }

  return customer.parse(data)
}

export const getApiUserLogin = async () => {
  const { data, error } = await supabaseClient.functions.invoke(`/user/login`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.string().parse(data)
}

export const getApiUserLogout = async () => {
  const { error } = await supabaseClient.functions.invoke(`/user/logout`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }
}

export const getApiUserUsername = async (args: GetApiUserUsernameArgs) => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/${args.username}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return customer.parse(data)
}

export const putApiUserUsername = async (args: PutApiUserUsernameArgs) => {
  const { error } = await supabaseClient.functions.invoke(
    `/user/${args.username}`,
    { method: 'PUT', body: args.body }
  )

  if (error) {
    throw error
  }
}

export const deleteApiUserUsername = async (
  args: DeleteApiUserUsernameArgs
) => {
  const { error } = await supabaseClient.functions.invoke(
    `/user/${args.username}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }
}

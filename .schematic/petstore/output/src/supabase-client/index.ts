import { z } from 'zod'
import { category, tag, pet, apiResponse, order, user } from 'src'

export const category = z.object({
  id: z.number().int().optional(),
  name: z.string().optional()
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
export const order = z.object({
  id: z.number().int().optional(),
  petId: z.number().int().optional(),
  quantity: z.number().int().optional(),
  shipDate: z.string().optional(),
  /** Order Status */ status: z.string().optional(),
  complete: z.boolean().optional()
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

const postApiPet = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/pet`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return pet.parse(data)
}
const putApiPet = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/pet`, {
    method: 'PUT',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return pet.parse(data)
}
const getApiPetFindByStatus = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/findByStatus`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(pet).parse(data)
}
const getApiPetFindByTags = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/findByTags`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.array(pet).parse(data)
}
const getApiPetPetIdTempTempId = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return pet.parse(data)
}
const postApiPetPetIdTempTempId = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
    { method: 'POST' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiPetPetIdTempTempId = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiPetPetIdUploadImage = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/pet/${queryArg.petId}/uploadImage`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return apiResponse.parse(data)
}
const getApiStoreInventory = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/inventory`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.record(z.string(), z.number().int()).parse(data)
}
const postApiStoreOrder = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/order`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return order.parse(data)
}
const getApiStoreOrderOrderId = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/order/${queryArg.orderId}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return order.parse(data)
}
const deleteApiStoreOrderOrderId = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/store/order/${queryArg.orderId}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const postApiUser = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/user`, {
    method: 'POST',
    body: queryArg.body
  })

  if (error) {
    throw error
  }

  return user.parse(data)
}
const postApiUserCreateWithList = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/createWithList`,
    { method: 'POST', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return user.parse(data)
}
const getApiUserLogin = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(`/user/login`, {
    method: 'GET'
  })

  if (error) {
    throw error
  }

  return z.string().parse(data)
}
const getApiUserLogout = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/logout`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const getApiUserUsername = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/${queryArg.username}`,
    { method: 'GET' }
  )

  if (error) {
    throw error
  }

  return user.parse(data)
}
const putApiUserUsername = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/${queryArg.username}`,
    { method: 'PUT', body: queryArg.body }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}
const deleteApiUserUsername = async queryArg => {
  const { data, error } = await supabaseClient.functions.invoke(
    `/user/${queryArg.username}`,
    { method: 'DELETE' }
  )

  if (error) {
    throw error
  }

  return z.void().parse(data)
}

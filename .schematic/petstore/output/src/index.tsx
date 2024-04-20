import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
export const postApiPetResponse = pet
export type PostApiPetResponse = z.infer<typeof postApiPetResponse>
export const postApiPetArgs = z.object({ body: pet })
export const putApiPetResponse = pet
export type PutApiPetResponse = z.infer<typeof putApiPetResponse>
export const putApiPetArgs = z.object({ body: pet })
export const getApiPetFindByStatusResponse = z.array(pet)
export type GetApiPetFindByStatusResponse = z.infer<
  typeof getApiPetFindByStatusResponse
>
export const getApiPetFindByStatusArgs = z.object({
  status: z.string().optional()
})
export const getApiPetFindByTagsResponse = z.array(pet)
export type GetApiPetFindByTagsResponse = z.infer<
  typeof getApiPetFindByTagsResponse
>
export const getApiPetFindByTagsArgs = z.object({
  tags: z.array(z.string()).optional()
})
export const getApiPetPetIdTempTempIdResponse = pet
export type GetApiPetPetIdTempTempIdResponse = z.infer<
  typeof getApiPetPetIdTempTempIdResponse
>
export const getApiPetPetIdTempTempIdArgs = z.object({
  petId: z.number().int()
})
export const postApiPetPetIdTempTempIdResponse = z.void()
export type PostApiPetPetIdTempTempIdResponse = z.infer<
  typeof postApiPetPetIdTempTempIdResponse
>
export const postApiPetPetIdTempTempIdArgs = z.object({
  petId: z.number().int(),
  name: z.string().optional(),
  status: z.string().optional()
})
export const deleteApiPetPetIdTempTempIdResponse = z.void()
export type DeleteApiPetPetIdTempTempIdResponse = z.infer<
  typeof deleteApiPetPetIdTempTempIdResponse
>
export const deleteApiPetPetIdTempTempIdArgs = z.object({
  api_key: z.string().optional(),
  petId: z.number().int()
})
export const apiResponse = z.object({
  code: z.number().int().optional(),
  type: z.string().optional(),
  message: z.string().optional()
})
export const postApiPetPetIdUploadImageResponse = apiResponse
export type PostApiPetPetIdUploadImageResponse = z.infer<
  typeof postApiPetPetIdUploadImageResponse
>
export const postApiPetPetIdUploadImageArgs = z.object({
  petId: z.number().int(),
  additionalMetadata: z.string().optional()
})
export const getApiStoreInventoryResponse = z.record(
  z.string(),
  z.number().int()
)
export type GetApiStoreInventoryResponse = z.infer<
  typeof getApiStoreInventoryResponse
>
export const getApiStoreInventoryArgs = z.void()
export const order = z.object({
  id: z.number().int().optional(),
  petId: z.number().int().optional(),
  quantity: z.number().int().optional(),
  shipDate: z.string().optional(),
  /** Order Status */ status: z.string().optional(),
  complete: z.boolean().optional()
})
export const postApiStoreOrderResponse = order
export type PostApiStoreOrderResponse = z.infer<
  typeof postApiStoreOrderResponse
>
export const postApiStoreOrderArgs = z.object({ body: order })
export const getApiStoreOrderOrderIdResponse = order
export type GetApiStoreOrderOrderIdResponse = z.infer<
  typeof getApiStoreOrderOrderIdResponse
>
export const getApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export const deleteApiStoreOrderOrderIdResponse = z.void()
export type DeleteApiStoreOrderOrderIdResponse = z.infer<
  typeof deleteApiStoreOrderOrderIdResponse
>
export const deleteApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
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
export const postApiUserResponse = user
export type PostApiUserResponse = z.infer<typeof postApiUserResponse>
export const postApiUserArgs = z.object({ body: user })
export const postApiUserCreateWithListResponse = user
export type PostApiUserCreateWithListResponse = z.infer<
  typeof postApiUserCreateWithListResponse
>
export const postApiUserCreateWithListArgs = z.object({ body: z.array(user) })
export const getApiUserLoginResponse = z.string()
export type GetApiUserLoginResponse = z.infer<typeof getApiUserLoginResponse>
export const getApiUserLoginArgs = z.object({
  username: z.string().optional(),
  password: z.string().optional()
})
export const getApiUserLogoutResponse = z.void()
export type GetApiUserLogoutResponse = z.infer<typeof getApiUserLogoutResponse>
export const getApiUserLogoutArgs = z.void()
export const getApiUserUsernameResponse = user
export type GetApiUserUsernameResponse = z.infer<
  typeof getApiUserUsernameResponse
>
export const getApiUserUsernameArgs = z.object({ username: z.string() })
export const putApiUserUsernameResponse = z.void()
export type PutApiUserUsernameResponse = z.infer<
  typeof putApiUserUsernameResponse
>
export const putApiUserUsernameArgs = z.object({
  username: z.string(),
  body: user
})
export const deleteApiUserUsernameResponse = z.void()
export type DeleteApiUserUsernameResponse = z.infer<
  typeof deleteApiUserUsernameResponse
>
export const deleteApiUserUsernameArgs = z.object({ username: z.string() })
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

export const injectedRtkApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    postApiPet: build.mutation<PostApiPetResponse, PostApiPetResponse>({
      query: queryArg => ({ path: `/pet`, method: POST, body: queryArg.body })
    }),
    putApiPet: build.mutation<PutApiPetResponse, PutApiPetResponse>({
      query: queryArg => ({ path: `/pet`, method: PUT, body: queryArg.body })
    }),
    getApiPetFindByStatus: build.query<
      GetApiPetFindByStatusResponse,
      GetApiPetFindByStatusResponse
    >({
      query: queryArg => ({
        path: `/pet/findByStatus`,
        method: GET,
        params: { status: queryArg.status }
      })
    }),
    getApiPetFindByTags: build.query<
      GetApiPetFindByTagsResponse,
      GetApiPetFindByTagsResponse
    >({
      query: queryArg => ({
        path: `/pet/findByTags`,
        method: GET,
        params: { tags: queryArg.tags }
      })
    }),
    getApiPetPetIdTempTempId: build.query<
      GetApiPetPetIdTempTempIdResponse,
      GetApiPetPetIdTempTempIdResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
        method: GET,
        params: { petId: queryArg.petId }
      })
    }),
    postApiPetPetIdTempTempId: build.mutation<
      PostApiPetPetIdTempTempIdResponse,
      PostApiPetPetIdTempTempIdResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
        method: POST,
        params: {
          petId: queryArg.petId,
          name: queryArg.name,
          status: queryArg.status
        }
      })
    }),
    deleteApiPetPetIdTempTempId: build.mutation<
      DeleteApiPetPetIdTempTempIdResponse,
      DeleteApiPetPetIdTempTempIdResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
        method: DELETE,
        params: { petId: queryArg.petId },
        headers: { api_key: queryArg.api_key }
      })
    }),
    postApiPetPetIdUploadImage: build.mutation<
      PostApiPetPetIdUploadImageResponse,
      PostApiPetPetIdUploadImageResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/uploadImage`,
        method: POST,
        params: {
          petId: queryArg.petId,
          additionalMetadata: queryArg.additionalMetadata
        },
        body: queryArg.body
      })
    }),
    getApiStoreInventory: build.query<
      GetApiStoreInventoryResponse,
      GetApiStoreInventoryResponse
    >({ query: () => ({ path: `/store/inventory`, method: GET }) }),
    postApiStoreOrder: build.mutation<
      PostApiStoreOrderResponse,
      PostApiStoreOrderResponse
    >({
      query: queryArg => ({
        path: `/store/order`,
        method: POST,
        body: queryArg.body
      })
    }),
    getApiStoreOrderOrderId: build.query<
      GetApiStoreOrderOrderIdResponse,
      GetApiStoreOrderOrderIdResponse
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: GET,
        params: { orderId: queryArg.orderId }
      })
    }),
    deleteApiStoreOrderOrderId: build.mutation<
      DeleteApiStoreOrderOrderIdResponse,
      DeleteApiStoreOrderOrderIdResponse
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: DELETE,
        params: { orderId: queryArg.orderId }
      })
    }),
    postApiUser: build.mutation<PostApiUserResponse, PostApiUserResponse>({
      query: queryArg => ({ path: `/user`, method: POST, body: queryArg.body })
    }),
    postApiUserCreateWithList: build.mutation<
      PostApiUserCreateWithListResponse,
      PostApiUserCreateWithListResponse
    >({
      query: queryArg => ({
        path: `/user/createWithList`,
        method: POST,
        body: queryArg.body
      })
    }),
    getApiUserLogin: build.query<
      GetApiUserLoginResponse,
      GetApiUserLoginResponse
    >({
      query: queryArg => ({
        path: `/user/login`,
        method: GET,
        params: { username: queryArg.username, password: queryArg.password }
      })
    }),
    getApiUserLogout: build.query<
      GetApiUserLogoutResponse,
      GetApiUserLogoutResponse
    >({ query: () => ({ path: `/user/logout`, method: GET }) }),
    getApiUserUsername: build.query<
      GetApiUserUsernameResponse,
      GetApiUserUsernameResponse
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: GET,
        params: { username: queryArg.username }
      })
    }),
    putApiUserUsername: build.mutation<
      PutApiUserUsernameResponse,
      PutApiUserUsernameResponse
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: PUT,
        params: { username: queryArg.username },
        body: queryArg.body
      })
    }),
    deleteApiUserUsername: build.mutation<
      DeleteApiUserUsernameResponse,
      DeleteApiUserUsernameResponse
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: DELETE,
        params: { username: queryArg.username }
      })
    })
  }),
  overrideExisting: false
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

const postApiPetFn = async (deploymentId: string) => {
  const res = await fetch(`/pet`, {
    method: 'POST'
  })

  const data = await res.json()

  return pet.parse(data)
}

const putApiPetFn = async (deploymentId: string) => {
  const res = await fetch(`/pet`, {
    method: 'PUT'
  })

  const data = await res.json()

  return pet.parse(data)
}

const getApiPetFindByStatusFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/findByStatus`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(pet).parse(data)
}

const getApiPetFindByTagsFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/findByTags`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(pet).parse(data)
}

const getApiPetPetIdTempTempIdFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/${petId}/temp/${tempId}`, {
    method: 'GET'
  })

  const data = await res.json()

  return pet.parse(data)
}

const postApiPetPetIdTempTempIdFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/${petId}/temp/${tempId}`, {
    method: 'POST'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiPetPetIdTempTempIdFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/${petId}/temp/${tempId}`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiPetPetIdUploadImageFn = async (deploymentId: string) => {
  const res = await fetch(`/pet/${petId}/uploadImage`, {
    method: 'POST'
  })

  const data = await res.json()

  return apiResponse.parse(data)
}

const getApiStoreInventoryFn = async (deploymentId: string) => {
  const res = await fetch(`/store/inventory`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.record(z.string(), z.number().int()).parse(data)
}

const postApiStoreOrderFn = async (deploymentId: string) => {
  const res = await fetch(`/store/order`, {
    method: 'POST'
  })

  const data = await res.json()

  return order.parse(data)
}

const getApiStoreOrderOrderIdFn = async (deploymentId: string) => {
  const res = await fetch(`/store/order/${orderId}`, {
    method: 'GET'
  })

  const data = await res.json()

  return order.parse(data)
}

const deleteApiStoreOrderOrderIdFn = async (deploymentId: string) => {
  const res = await fetch(`/store/order/${orderId}`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const postApiUserFn = async (deploymentId: string) => {
  const res = await fetch(`/user`, {
    method: 'POST'
  })

  const data = await res.json()

  return user.parse(data)
}

const postApiUserCreateWithListFn = async (deploymentId: string) => {
  const res = await fetch(`/user/createWithList`, {
    method: 'POST'
  })

  const data = await res.json()

  return user.parse(data)
}

const getApiUserLoginFn = async (deploymentId: string) => {
  const res = await fetch(`/user/login`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.string().parse(data)
}

const getApiUserLogoutFn = async (deploymentId: string) => {
  const res = await fetch(`/user/logout`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const getApiUserUsernameFn = async (deploymentId: string) => {
  const res = await fetch(`/user/${username}`, {
    method: 'GET'
  })

  const data = await res.json()

  return user.parse(data)
}

const putApiUserUsernameFn = async (deploymentId: string) => {
  const res = await fetch(`/user/${username}`, {
    method: 'PUT'
  })

  const data = await res.json()

  return z.void().parse(data)
}

const deleteApiUserUsernameFn = async (deploymentId: string) => {
  const res = await fetch(`/user/${username}`, {
    method: 'DELETE'
  })

  const data = await res.json()

  return z.void().parse(data)
}

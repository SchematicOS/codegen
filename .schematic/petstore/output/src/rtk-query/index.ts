import { z } from 'zod'
import { category, tag, pet, apiResponse, order, user } from 'src'
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

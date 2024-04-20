import { pet, apiResponse, order, user } from 'src/index.tsx'
import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApiPetResponse = pet
export type PostApiPetResponse = z.infer<typeof postApiPetResponse>
export const postApiPetArgs = z.object({ body: pet })
export type PostApiPetArgs = z.infer<typeof postApiPetArgs>
export const putApiPetResponse = pet
export type PutApiPetResponse = z.infer<typeof putApiPetResponse>
export const putApiPetArgs = z.object({ body: pet })
export type PutApiPetArgs = z.infer<typeof putApiPetArgs>
export const getApiPetFindByStatusResponse = z.array(pet)
export type GetApiPetFindByStatusResponse = z.infer<
  typeof getApiPetFindByStatusResponse
>
export const getApiPetFindByStatusArgs = z.object({
  status: z.string().optional()
})
export type GetApiPetFindByStatusArgs = z.infer<
  typeof getApiPetFindByStatusArgs
>
export const getApiPetFindByTagsResponse = z.array(pet)
export type GetApiPetFindByTagsResponse = z.infer<
  typeof getApiPetFindByTagsResponse
>
export const getApiPetFindByTagsArgs = z.object({
  tags: z.array(z.string()).optional()
})
export type GetApiPetFindByTagsArgs = z.infer<typeof getApiPetFindByTagsArgs>
export const getApiPetPetIdTempTempIdResponse = pet
export type GetApiPetPetIdTempTempIdResponse = z.infer<
  typeof getApiPetPetIdTempTempIdResponse
>
export const getApiPetPetIdTempTempIdArgs = z.object({
  petId: z.number().int()
})
export type GetApiPetPetIdTempTempIdArgs = z.infer<
  typeof getApiPetPetIdTempTempIdArgs
>
export const postApiPetPetIdTempTempIdResponse = z.void()
export type PostApiPetPetIdTempTempIdResponse = z.infer<
  typeof postApiPetPetIdTempTempIdResponse
>
export const postApiPetPetIdTempTempIdArgs = z.object({
  petId: z.number().int(),
  name: z.string().optional(),
  status: z.string().optional()
})
export type PostApiPetPetIdTempTempIdArgs = z.infer<
  typeof postApiPetPetIdTempTempIdArgs
>
export const deleteApiPetPetIdTempTempIdResponse = z.void()
export type DeleteApiPetPetIdTempTempIdResponse = z.infer<
  typeof deleteApiPetPetIdTempTempIdResponse
>
export const deleteApiPetPetIdTempTempIdArgs = z.object({
  api_key: z.string().optional(),
  petId: z.number().int()
})
export type DeleteApiPetPetIdTempTempIdArgs = z.infer<
  typeof deleteApiPetPetIdTempTempIdArgs
>
export const postApiPetPetIdUploadImageResponse = apiResponse
export type PostApiPetPetIdUploadImageResponse = z.infer<
  typeof postApiPetPetIdUploadImageResponse
>
export const postApiPetPetIdUploadImageArgs = z.object({
  petId: z.number().int(),
  additionalMetadata: z.string().optional()
})
export type PostApiPetPetIdUploadImageArgs = z.infer<
  typeof postApiPetPetIdUploadImageArgs
>
export const getApiStoreInventoryResponse = z.record(
  z.string(),
  z.number().int()
)
export type GetApiStoreInventoryResponse = z.infer<
  typeof getApiStoreInventoryResponse
>
export const getApiStoreInventoryArgs = z.void()
export type GetApiStoreInventoryArgs = z.infer<typeof getApiStoreInventoryArgs>
export const postApiStoreOrderResponse = order
export type PostApiStoreOrderResponse = z.infer<
  typeof postApiStoreOrderResponse
>
export const postApiStoreOrderArgs = z.object({ body: order })
export type PostApiStoreOrderArgs = z.infer<typeof postApiStoreOrderArgs>
export const getApiStoreOrderOrderIdResponse = order
export type GetApiStoreOrderOrderIdResponse = z.infer<
  typeof getApiStoreOrderOrderIdResponse
>
export const getApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export type GetApiStoreOrderOrderIdArgs = z.infer<
  typeof getApiStoreOrderOrderIdArgs
>
export const deleteApiStoreOrderOrderIdResponse = z.void()
export type DeleteApiStoreOrderOrderIdResponse = z.infer<
  typeof deleteApiStoreOrderOrderIdResponse
>
export const deleteApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export type DeleteApiStoreOrderOrderIdArgs = z.infer<
  typeof deleteApiStoreOrderOrderIdArgs
>
export const postApiUserResponse = user
export type PostApiUserResponse = z.infer<typeof postApiUserResponse>
export const postApiUserArgs = z.object({ body: user })
export type PostApiUserArgs = z.infer<typeof postApiUserArgs>
export const postApiUserCreateWithListResponse = user
export type PostApiUserCreateWithListResponse = z.infer<
  typeof postApiUserCreateWithListResponse
>
export const postApiUserCreateWithListArgs = z.object({ body: z.array(user) })
export type PostApiUserCreateWithListArgs = z.infer<
  typeof postApiUserCreateWithListArgs
>
export const getApiUserLoginResponse = z.string()
export type GetApiUserLoginResponse = z.infer<typeof getApiUserLoginResponse>
export const getApiUserLoginArgs = z.object({
  username: z.string().optional(),
  password: z.string().optional()
})
export type GetApiUserLoginArgs = z.infer<typeof getApiUserLoginArgs>
export const getApiUserLogoutResponse = z.void()
export type GetApiUserLogoutResponse = z.infer<typeof getApiUserLogoutResponse>
export const getApiUserLogoutArgs = z.void()
export type GetApiUserLogoutArgs = z.infer<typeof getApiUserLogoutArgs>
export const getApiUserUsernameResponse = user
export type GetApiUserUsernameResponse = z.infer<
  typeof getApiUserUsernameResponse
>
export const getApiUserUsernameArgs = z.object({ username: z.string() })
export type GetApiUserUsernameArgs = z.infer<typeof getApiUserUsernameArgs>
export const putApiUserUsernameResponse = z.void()
export type PutApiUserUsernameResponse = z.infer<
  typeof putApiUserUsernameResponse
>
export const putApiUserUsernameArgs = z.object({
  username: z.string(),
  body: user
})
export type PutApiUserUsernameArgs = z.infer<typeof putApiUserUsernameArgs>
export const deleteApiUserUsernameResponse = z.void()
export type DeleteApiUserUsernameResponse = z.infer<
  typeof deleteApiUserUsernameResponse
>
export const deleteApiUserUsernameArgs = z.object({ username: z.string() })
export type DeleteApiUserUsernameArgs = z.infer<
  typeof deleteApiUserUsernameArgs
>

export const injectedRtkApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    postApiPet: build.mutation<PostApiPetResponse, PostApiPetArgs>({
      query: queryArg => ({ path: `/pet`, method: POST, body: queryArg.body })
    }),
    putApiPet: build.mutation<PutApiPetResponse, PutApiPetArgs>({
      query: queryArg => ({ path: `/pet`, method: PUT, body: queryArg.body })
    }),
    getApiPetFindByStatus: build.query<
      GetApiPetFindByStatusResponse,
      GetApiPetFindByStatusArgs
    >({
      query: queryArg => ({
        path: `/pet/findByStatus`,
        method: GET,
        params: { status: queryArg.status }
      })
    }),
    getApiPetFindByTags: build.query<
      GetApiPetFindByTagsResponse,
      GetApiPetFindByTagsArgs
    >({
      query: queryArg => ({
        path: `/pet/findByTags`,
        method: GET,
        params: { tags: queryArg.tags }
      })
    }),
    getApiPetPetIdTempTempId: build.query<
      GetApiPetPetIdTempTempIdResponse,
      GetApiPetPetIdTempTempIdArgs
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
        method: GET,
        params: { petId: queryArg.petId }
      })
    }),
    postApiPetPetIdTempTempId: build.mutation<
      PostApiPetPetIdTempTempIdResponse,
      PostApiPetPetIdTempTempIdArgs
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
      DeleteApiPetPetIdTempTempIdArgs
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
      PostApiPetPetIdUploadImageArgs
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
      GetApiStoreInventoryArgs
    >({ query: () => ({ path: `/store/inventory`, method: GET }) }),
    postApiStoreOrder: build.mutation<
      PostApiStoreOrderResponse,
      PostApiStoreOrderArgs
    >({
      query: queryArg => ({
        path: `/store/order`,
        method: POST,
        body: queryArg.body
      })
    }),
    getApiStoreOrderOrderId: build.query<
      GetApiStoreOrderOrderIdResponse,
      GetApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: GET,
        params: { orderId: queryArg.orderId }
      })
    }),
    deleteApiStoreOrderOrderId: build.mutation<
      DeleteApiStoreOrderOrderIdResponse,
      DeleteApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: DELETE,
        params: { orderId: queryArg.orderId }
      })
    }),
    postApiUser: build.mutation<PostApiUserResponse, PostApiUserArgs>({
      query: queryArg => ({ path: `/user`, method: POST, body: queryArg.body })
    }),
    postApiUserCreateWithList: build.mutation<
      PostApiUserCreateWithListResponse,
      PostApiUserCreateWithListArgs
    >({
      query: queryArg => ({
        path: `/user/createWithList`,
        method: POST,
        body: queryArg.body
      })
    }),
    getApiUserLogin: build.query<GetApiUserLoginResponse, GetApiUserLoginArgs>({
      query: queryArg => ({
        path: `/user/login`,
        method: GET,
        params: { username: queryArg.username, password: queryArg.password }
      })
    }),
    getApiUserLogout: build.query<
      GetApiUserLogoutResponse,
      GetApiUserLogoutArgs
    >({ query: () => ({ path: `/user/logout`, method: GET }) }),
    getApiUserUsername: build.query<
      GetApiUserUsernameResponse,
      GetApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: GET,
        params: { username: queryArg.username }
      })
    }),
    putApiUserUsername: build.mutation<
      PutApiUserUsernameResponse,
      PutApiUserUsernameArgs
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
      DeleteApiUserUsernameArgs
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

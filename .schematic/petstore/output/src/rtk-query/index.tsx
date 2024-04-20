import { pet, apiResponse, order, user } from 'src/index.tsx'
import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** Successful operation */
export const postApiPetResponse = pet
export type PostApiPetResponse = z.infer<typeof postApiPetResponse>
export const postApiPetArgs = z.object({ body: pet })
export type PostApiPetArgs = z.infer<typeof postApiPetArgs>
/** Successful operation */
export const putApiPetResponse = pet
export type PutApiPetResponse = z.infer<typeof putApiPetResponse>
export const putApiPetArgs = z.object({ body: pet })
export type PutApiPetArgs = z.infer<typeof putApiPetArgs>
/** successful operation */
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
/** successful operation */
export const getApiPetFindByTagsResponse = z.array(pet)
export type GetApiPetFindByTagsResponse = z.infer<
  typeof getApiPetFindByTagsResponse
>
export const getApiPetFindByTagsArgs = z.object({
  tags: z.array(z.string()).optional()
})
export type GetApiPetFindByTagsArgs = z.infer<typeof getApiPetFindByTagsArgs>
/** successful operation */
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
/** successful operation */
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
/** successful operation */
export const getApiStoreInventoryResponse = z.record(
  z.string(),
  z.number().int()
)
export type GetApiStoreInventoryResponse = z.infer<
  typeof getApiStoreInventoryResponse
>
export const getApiStoreInventoryArgs = z.void()
export type GetApiStoreInventoryArgs = z.infer<typeof getApiStoreInventoryArgs>
/** successful operation */
export const postApiStoreOrderResponse = order
export type PostApiStoreOrderResponse = z.infer<
  typeof postApiStoreOrderResponse
>
export const postApiStoreOrderArgs = z.object({ body: order })
export type PostApiStoreOrderArgs = z.infer<typeof postApiStoreOrderArgs>
/** successful operation */
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
/** successful operation */
export const postApiUserResponse = user
export type PostApiUserResponse = z.infer<typeof postApiUserResponse>
export const postApiUserArgs = z.object({ body: user })
export type PostApiUserArgs = z.infer<typeof postApiUserArgs>
/** Successful operation */
export const postApiUserCreateWithListResponse = user
export type PostApiUserCreateWithListResponse = z.infer<
  typeof postApiUserCreateWithListResponse
>
export const postApiUserCreateWithListArgs = z.object({ body: z.array(user) })
export type PostApiUserCreateWithListArgs = z.infer<
  typeof postApiUserCreateWithListArgs
>
/** successful operation */
export const getApiUserLoginResponse = z.string()
export type GetApiUserLoginResponse = z.infer<typeof getApiUserLoginResponse>
export const getApiUserLoginArgs = z.object({
  username: z.string().optional(),
  password: z.string().optional()
})
export type GetApiUserLoginArgs = z.infer<typeof getApiUserLoginArgs>
/** successful operation */
export const getApiUserLogoutResponse = z.void()
export type GetApiUserLogoutResponse = z.infer<typeof getApiUserLogoutResponse>
export const getApiUserLogoutArgs = z.void()
export type GetApiUserLogoutArgs = z.infer<typeof getApiUserLogoutArgs>
/** successful operation */
export const getApiUserUsernameResponse = user
export type GetApiUserUsernameResponse = z.infer<
  typeof getApiUserUsernameResponse
>
export const getApiUserUsernameArgs = z.object({ username: z.string() })
export type GetApiUserUsernameArgs = z.infer<typeof getApiUserUsernameArgs>
/** successful operation */
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
    /** Add a new pet to the store */
    postApiPet: build.mutation<PostApiPetResponse, PostApiPetArgs>({
      query: queryArg => ({ path: `/pet`, method: POST, body: queryArg.body })
    }),
    /** Update an existing pet by Id */
    putApiPet: build.mutation<PutApiPetResponse, PutApiPetArgs>({
      query: queryArg => ({ path: `/pet`, method: PUT, body: queryArg.body })
    }),
    /** Multiple status values can be provided with comma separated strings */
    getApiPetFindByStatus: build.query<
      GetApiPetFindByStatusResponse,
      GetApiPetFindByStatusArgs
    >({
      query: queryArg => ({
        path: `/pet/findByStatus`,
        method: GET,
        params: {
          /** Status values that need to be considered for filter */
          status: queryArg.status
        }
      })
    }),
    /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
    getApiPetFindByTags: build.query<
      GetApiPetFindByTagsResponse,
      GetApiPetFindByTagsArgs
    >({
      query: queryArg => ({
        path: `/pet/findByTags`,
        method: GET,
        params: {
          /** Tags to filter by */ tags: queryArg.tags
        }
      })
    }),
    /** Returns a single pet */
    getApiPetPetIdTempTempId: build.query<
      GetApiPetPetIdTempTempIdResponse,
      GetApiPetPetIdTempTempIdArgs
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/temp/${queryArg.tempId}`,
        method: GET,
        params: {
          /** ID of pet to return */ petId: queryArg.petId
        }
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
          /** ID of pet that needs to be updated */ petId: queryArg.petId,
          /** Name of pet that needs to be updated */
          name: queryArg.name,
          /** Status of pet that needs to be updated */
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
        params: {
          /** Pet id to delete */ petId: queryArg.petId
        },
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
          /** ID of pet to update */ petId: queryArg.petId,
          /** Additional Metadata */
          additionalMetadata: queryArg.additionalMetadata
        },
        body: queryArg.body
      })
    }),
    /** Returns a map of status codes to quantities */
    getApiStoreInventory: build.query<
      GetApiStoreInventoryResponse,
      GetApiStoreInventoryArgs
    >({ query: () => ({ path: `/store/inventory`, method: GET }) }),
    /** Place a new order in the store */
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
    /** For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. */
    getApiStoreOrderOrderId: build.query<
      GetApiStoreOrderOrderIdResponse,
      GetApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: GET,
        params: {
          /** ID of order that needs to be fetched */ orderId: queryArg.orderId
        }
      })
    }),
    /** For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors */
    deleteApiStoreOrderOrderId: build.mutation<
      DeleteApiStoreOrderOrderIdResponse,
      DeleteApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: DELETE,
        params: {
          /** ID of the order that needs to be deleted */
          orderId: queryArg.orderId
        }
      })
    }),
    /** This can only be done by the logged in user. */
    postApiUser: build.mutation<PostApiUserResponse, PostApiUserArgs>({
      query: queryArg => ({ path: `/user`, method: POST, body: queryArg.body })
    }),
    /** Creates list of users with given input array */
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
        params: {
          /** The user name for login */ username: queryArg.username,
          /** The password for login in clear text */
          password: queryArg.password
        }
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
        params: {
          /** The name that needs to be fetched. Use user1 for testing.  */
          username: queryArg.username
        }
      })
    }),
    /** This can only be done by the logged in user. */
    putApiUserUsername: build.mutation<
      PutApiUserUsernameResponse,
      PutApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: PUT,
        params: {
          /** name that needs to be updated */ username: queryArg.username
        },
        body: queryArg.body
      })
    }),
    /** This can only be done by the logged in user. */
    deleteApiUserUsername: build.mutation<
      DeleteApiUserUsernameResponse,
      DeleteApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: DELETE,
        params: {
          /** The name that needs to be deleted */ username: queryArg.username
        }
      })
    })
  }),
  overrideExisting: false
})

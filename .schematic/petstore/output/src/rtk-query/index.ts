import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

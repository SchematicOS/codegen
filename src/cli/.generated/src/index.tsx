import { Controller, useForm } from 'react-hook-form'
import { default as FormLabel } from '@mui/joy/FormLabel'
import { default as Input } from '@mui/joy/Input'
import { default as FormControl } from '@mui/joy/FormControl'
import { default as FormHelperText } from '@mui/joy/FormHelperText'
import { default as React } from 'react'
import { z } from 'zod'
import { default as Box } from '@mui/joy/Box'
import { zodResolver } from '@hookform/resolvers/zod'
import { default as Button } from '@mui/joy/Button'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const category = z
  .object({ id: z.number().int().optional(), name: z.string().optional() })
  .optional()
export const tag = z
  .object({ id: z.number().int().optional(), name: z.string().optional() })
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
export const postApiPetResponse = pet.optional()
export type PostApiPetResponse = z.infer<typeof postApiPetResponse>
export const postApiPetArgs = z.object({ body: pet.optional() }).optional()
export const putApiPetResponse = pet.optional()
export type PutApiPetResponse = z.infer<typeof putApiPetResponse>
export const putApiPetArgs = z.object({ body: pet.optional() }).optional()
export const getApiPetFindByStatusResponse = z.array(pet.optional()).optional()
export type GetApiPetFindByStatusResponse = z.infer<
  typeof getApiPetFindByStatusResponse
>
export const getApiPetFindByStatusArgs = z
  .object({ status: z.enum(['available', 'pending', 'sold']).optional() })
  .optional()
export const getApiPetFindByTagsResponse = z.array(pet.optional()).optional()
export type GetApiPetFindByTagsResponse = z.infer<
  typeof getApiPetFindByTagsResponse
>
export const getApiPetFindByTagsArgs = z
  .object({ tags: z.array(z.string().optional()).optional() })
  .optional()
export const getApiPetPetIdResponse = pet.optional()
export type GetApiPetPetIdResponse = z.infer<typeof getApiPetPetIdResponse>
export const getApiPetPetIdArgs = z
  .object({ petId: z.number().int().optional() })
  .optional()
export const postApiPetPetIdResponse = z.void().optional()
export type PostApiPetPetIdResponse = z.infer<typeof postApiPetPetIdResponse>
export const postApiPetPetIdArgs = z
  .object({
    petId: z.number().int().optional(),
    name: z.string().optional(),
    status: z.string().optional()
  })
  .optional()
export const deleteApiPetPetIdResponse = z.void().optional()
export type DeleteApiPetPetIdResponse = z.infer<
  typeof deleteApiPetPetIdResponse
>
export const deleteApiPetPetIdArgs = z
  .object({
    api_key: z.string().optional(),
    petId: z.number().int().optional()
  })
  .optional()
export const apiResponse = z
  .object({
    code: z.number().int().optional(),
    type: z.string().optional(),
    message: z.string().optional()
  })
  .optional()
export const postApiPetPetIdUploadImageResponse = apiResponse.optional()
export type PostApiPetPetIdUploadImageResponse = z.infer<
  typeof postApiPetPetIdUploadImageResponse
>
export const postApiPetPetIdUploadImageArgs = z
  .object({
    petId: z.number().int().optional(),
    additionalMetadata: z.string().optional()
  })
  .optional()
export const getApiStoreInventoryResponse = z
  .record(z.string(), z.number().int().optional())
  .optional()
export type GetApiStoreInventoryResponse = z.infer<
  typeof getApiStoreInventoryResponse
>
export const getApiStoreInventoryArgs = z.void().optional()
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
export const postApiStoreOrderResponse = order.optional()
export type PostApiStoreOrderResponse = z.infer<
  typeof postApiStoreOrderResponse
>
export const postApiStoreOrderArgs = z
  .object({ body: order.optional() })
  .optional()
export const getApiStoreOrderOrderIdResponse = order.optional()
export type GetApiStoreOrderOrderIdResponse = z.infer<
  typeof getApiStoreOrderOrderIdResponse
>
export const getApiStoreOrderOrderIdArgs = z
  .object({ orderId: z.number().int().optional() })
  .optional()
export const deleteApiStoreOrderOrderIdResponse = z.void().optional()
export type DeleteApiStoreOrderOrderIdResponse = z.infer<
  typeof deleteApiStoreOrderOrderIdResponse
>
export const deleteApiStoreOrderOrderIdArgs = z
  .object({ orderId: z.number().int().optional() })
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
export const postApiUserResponse = user.optional()
export type PostApiUserResponse = z.infer<typeof postApiUserResponse>
export const postApiUserArgs = z.object({ body: user.optional() }).optional()
export const postApiUserCreateWithListResponse = user.optional()
export type PostApiUserCreateWithListResponse = z.infer<
  typeof postApiUserCreateWithListResponse
>
export const postApiUserCreateWithListArgs = z
  .object({ body: z.array(user.optional()).optional() })
  .optional()
export const getApiUserLoginResponse = z.string().optional()
export type GetApiUserLoginResponse = z.infer<typeof getApiUserLoginResponse>
export const getApiUserLoginArgs = z
  .object({ username: z.string().optional(), password: z.string().optional() })
  .optional()
export const getApiUserLogoutResponse = z.void().optional()
export type GetApiUserLogoutResponse = z.infer<typeof getApiUserLogoutResponse>
export const getApiUserLogoutArgs = z.void().optional()
export const getApiUserUsernameResponse = user.optional()
export type GetApiUserUsernameResponse = z.infer<
  typeof getApiUserUsernameResponse
>
export const getApiUserUsernameArgs = z
  .object({ username: z.string().optional() })
  .optional()
export const putApiUserUsernameResponse = z.void().optional()
export type PutApiUserUsernameResponse = z.infer<
  typeof putApiUserUsernameResponse
>
export const putApiUserUsernameArgs = z
  .object({ username: z.string().optional(), body: user.optional() })
  .optional()
export const deleteApiUserUsernameResponse = z.void().optional()
export type DeleteApiUserUsernameResponse = z.infer<
  typeof deleteApiUserUsernameResponse
>
export const deleteApiUserUsernameArgs = z
  .object({ username: z.string().optional() })
  .optional()
export const address = z
  .object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional()
  })
  .optional()
export const customer = z
  .object({
    id: z.number().int().optional(),
    username: z.string().optional(),
    address: z.array(address.optional()).optional()
  })
  .optional()

export const CreatePet = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          category: category.optional(),
          photoUrls: z.array(z.string().optional()).optional(),
          tags: z.array(tag.optional()).optional(),
          status: z.enum(['available', 'pending', 'sold']).optional()
        })
        .optional()
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>name</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>category</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="photoUrls"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>photoUrls</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>tags</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>status</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const UpdatePet = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          category: category.optional(),
          photoUrls: z.array(z.string().optional()).optional(),
          tags: z.array(tag.optional()).optional(),
          status: z.enum(['available', 'pending', 'sold']).optional()
        })
        .optional()
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>name</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>category</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="photoUrls"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>photoUrls</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>tags</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>status</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateStoreOrder = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
        .object({
          id: z.number().int().optional(),
          petId: z.number().int().optional(),
          quantity: z.number().int().optional(),
          shipDate: z.string().optional(),
          status: z.enum(['placed', 'approved', 'delivered']).optional(),
          complete: z.boolean().optional()
        })
        .optional()
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="petId"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>petId</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="quantity"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>quantity</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="shipDate"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>shipDate</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>status</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="complete"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>complete</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const CreateUser = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
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
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>firstName</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>lastName</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>phone</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="userStatus"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>userStatus</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

export const UpdateUserUsername = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(
      z
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
    )
  })

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      flex={1}
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>id</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>firstName</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>lastName</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>phone</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        name="userStatus"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl>
            <FormLabel>userStatus</FormLabel>
            <Input {...field} />
            {fieldState.error?.message ? (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
      <Box display="flex" flexDirection="column" gap="16px" p="8px">
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  )
}

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
        params: {
          status: queryArg.status
        }
      })
    }),
    getApiPetFindByTags: build.query<
      GetApiPetFindByTagsResponse,
      GetApiPetFindByTagsResponse
    >({
      query: queryArg => ({
        path: `/pet/findByTags`,
        method: GET,
        params: {
          tags: queryArg.tags
        }
      })
    }),
    getApiPetPetId: build.query<GetApiPetPetIdResponse, GetApiPetPetIdResponse>(
      {
        query: queryArg => ({
          path: `/pet/${queryArg.petId}`,
          method: GET,
          params: {
            petId: queryArg.petId
          }
        })
      }
    ),
    postApiPetPetId: build.mutation<
      PostApiPetPetIdResponse,
      PostApiPetPetIdResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}`,
        method: POST,
        params: {
          petId: queryArg.petId,
          name: queryArg.name,
          status: queryArg.status
        }
      })
    }),
    deleteApiPetPetId: build.mutation<
      DeleteApiPetPetIdResponse,
      DeleteApiPetPetIdResponse
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}`,
        method: DELETE,
        params: {
          petId: queryArg.petId
        },
        headers: {
          api_key: queryArg.api_key
        }
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
    >({ query: queryArg => ({ path: `/store/inventory`, method: GET }) }),
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
        params: {
          orderId: queryArg.orderId
        }
      })
    }),
    deleteApiStoreOrderOrderId: build.mutation<
      DeleteApiStoreOrderOrderIdResponse,
      DeleteApiStoreOrderOrderIdResponse
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: DELETE,
        params: {
          orderId: queryArg.orderId
        }
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
        params: {
          username: queryArg.username,
          password: queryArg.password
        }
      })
    }),
    getApiUserLogout: build.query<
      GetApiUserLogoutResponse,
      GetApiUserLogoutResponse
    >({ query: queryArg => ({ path: `/user/logout`, method: GET }) }),
    getApiUserUsername: build.query<
      GetApiUserUsernameResponse,
      GetApiUserUsernameResponse
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: GET,
        params: {
          username: queryArg.username
        }
      })
    }),
    putApiUserUsername: build.mutation<
      PutApiUserUsernameResponse,
      PutApiUserUsernameResponse
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: PUT,
        params: {
          username: queryArg.username
        },
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
        params: {
          username: queryArg.username
        }
      })
    })
  }),
  overrideExisting: false
})

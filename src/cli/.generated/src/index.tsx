import { category, tag, pet, apiResponse, order, user } from './src/index.ts'
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
import { baseApi as api } from 'features/api/baseApi'

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
export const postApiPetArgs = z.object({ body: pet.optional() }).optional()
export const putApiPetResponse = pet.optional()
export const putApiPetArgs = z.object({ body: pet.optional() }).optional()
export const getApiPetFindByStatusResponse = z.array(pet.optional()).optional()
export const getApiPetFindByStatusArgs = z
  .object({ status: z.enum(['available', 'pending', 'sold']).optional() })
  .optional()
export const getApiPetFindByTagsResponse = z.array(pet.optional()).optional()
export const getApiPetFindByTagsArgs = z
  .object({ tags: z.array(z.string().optional()).optional() })
  .optional()
export const getApiPetPetIdResponse = pet.optional()
export const getApiPetPetIdArgs = z
  .object({ petId: z.number().int().optional() })
  .optional()
export const postApiPetPetIdResponse = z.void().optional()
export const postApiPetPetIdArgs = z
  .object({
    petId: z.number().int().optional(),
    name: z.string().optional(),
    status: z.string().optional()
  })
  .optional()
export const deleteApiPetPetIdResponse = z.void().optional()
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
export const postApiPetPetIdUploadImageArgs = z
  .object({
    petId: z.number().int().optional(),
    additionalMetadata: z.string().optional()
  })
  .optional()
export const getApiStoreInventoryResponse = z
  .record(z.string(), z.number().int().optional())
  .optional()
export const getApiStoreInventoryArgs = z.object({}).optional()
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
export const postApiStoreOrderArgs = z
  .object({ body: order.optional() })
  .optional()
export const getApiStoreOrderOrderIdResponse = order.optional()
export const getApiStoreOrderOrderIdArgs = z
  .object({ orderId: z.number().int().optional() })
  .optional()
export const deleteApiStoreOrderOrderIdResponse = z.void().optional()
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
export const postApiUserArgs = z.object({ body: user.optional() }).optional()
export const postApiUserCreateWithListResponse = user.optional()
export const postApiUserCreateWithListArgs = z
  .object({ body: z.array(user.optional()).optional() })
  .optional()
export const getApiUserLoginResponse = z.string().optional()
export const getApiUserLoginArgs = z
  .object({ username: z.string().optional(), password: z.string().optional() })
  .optional()
export const getApiUserLogoutResponse = z.void().optional()
export const getApiUserLogoutArgs = z.object({}).optional()
export const getApiUserUsernameResponse = user.optional()
export const getApiUserUsernameArgs = z
  .object({ username: z.string().optional() })
  .optional()
export const putApiUserUsernameResponse = z.void().optional()
export const putApiUserUsernameArgs = z
  .object({ username: z.string().optional(), body: user.optional() })
  .optional()
export const deleteApiUserUsernameResponse = z.void().optional()
export const deleteApiUserUsernameArgs = z
  .object({ username: z.string().optional() })
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

export const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postApiPet: build.mutation<postApiPetResponse, postApiPetArgs>({
      query: queryArg => ({
        path: `/pet`,
        method: POST,
        __EMPTY__,
        __EMPTY__,
        body: body
      })
    }),
    putApiPet: build.mutation<putApiPetResponse, putApiPetArgs>({
      query: queryArg => ({
        path: `/pet`,
        method: PUT,
        __EMPTY__,
        __EMPTY__,
        body: body
      })
    }),
    getApiPetFindByStatus: build.query<
      getApiPetFindByStatusResponse,
      getApiPetFindByStatusArgs
    >({
      query: queryArg => ({
        path: `/pet/findByStatus`,
        method: GET,
        params: {
          status: queryArg.status
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    getApiPetFindByTags: build.query<
      getApiPetFindByTagsResponse,
      getApiPetFindByTagsArgs
    >({
      query: queryArg => ({
        path: `/pet/findByTags`,
        method: GET,
        params: {
          tags: queryArg.tags
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    getApiPetPetId: build.query<getApiPetPetIdResponse, getApiPetPetIdArgs>({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}`,
        method: GET,
        params: {
          petId: queryArg.petId
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    postApiPetPetId: build.mutation<
      postApiPetPetIdResponse,
      postApiPetPetIdArgs
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}`,
        method: POST,
        params: {
          petId: queryArg.petId,
          name: queryArg.name,
          status: queryArg.status
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    deleteApiPetPetId: build.mutation<
      deleteApiPetPetIdResponse,
      deleteApiPetPetIdArgs
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}`,
        method: DELETE,
        params: {
          petId: queryArg.petId
        },
        headers: {
          api_key: queryArg.api_key
        },
        __EMPTY__
      })
    }),
    postApiPetPetIdUploadImage: build.mutation<
      postApiPetPetIdUploadImageResponse,
      postApiPetPetIdUploadImageArgs
    >({
      query: queryArg => ({
        path: `/pet/${queryArg.petId}/uploadImage`,
        method: POST,
        params: {
          petId: queryArg.petId,
          additionalMetadata: queryArg.additionalMetadata
        },
        __EMPTY__,
        body: body
      })
    }),
    getApiStoreInventory: build.query<
      getApiStoreInventoryResponse,
      getApiStoreInventoryArgs
    >({
      query: queryArg => ({
        path: `/store/inventory`,
        method: GET,
        __EMPTY__,
        __EMPTY__,
        __EMPTY__
      })
    }),
    postApiStoreOrder: build.mutation<
      postApiStoreOrderResponse,
      postApiStoreOrderArgs
    >({
      query: queryArg => ({
        path: `/store/order`,
        method: POST,
        __EMPTY__,
        __EMPTY__,
        body: body
      })
    }),
    getApiStoreOrderOrderId: build.query<
      getApiStoreOrderOrderIdResponse,
      getApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: GET,
        params: {
          orderId: queryArg.orderId
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    deleteApiStoreOrderOrderId: build.mutation<
      deleteApiStoreOrderOrderIdResponse,
      deleteApiStoreOrderOrderIdArgs
    >({
      query: queryArg => ({
        path: `/store/order/${queryArg.orderId}`,
        method: DELETE,
        params: {
          orderId: queryArg.orderId
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    postApiUser: build.mutation<postApiUserResponse, postApiUserArgs>({
      query: queryArg => ({
        path: `/user`,
        method: POST,
        __EMPTY__,
        __EMPTY__,
        body: body
      })
    }),
    postApiUserCreateWithList: build.mutation<
      postApiUserCreateWithListResponse,
      postApiUserCreateWithListArgs
    >({
      query: queryArg => ({
        path: `/user/createWithList`,
        method: POST,
        __EMPTY__,
        __EMPTY__,
        body: body
      })
    }),
    getApiUserLogin: build.query<getApiUserLoginResponse, getApiUserLoginArgs>({
      query: queryArg => ({
        path: `/user/login`,
        method: GET,
        params: {
          username: queryArg.username,
          password: queryArg.password
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    getApiUserLogout: build.query<
      getApiUserLogoutResponse,
      getApiUserLogoutArgs
    >({
      query: queryArg => ({
        path: `/user/logout`,
        method: GET,
        __EMPTY__,
        __EMPTY__,
        __EMPTY__
      })
    }),
    getApiUserUsername: build.query<
      getApiUserUsernameResponse,
      getApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: GET,
        params: {
          username: queryArg.username
        },
        __EMPTY__,
        __EMPTY__
      })
    }),
    putApiUserUsername: build.mutation<
      putApiUserUsernameResponse,
      putApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: PUT,
        params: {
          username: queryArg.username
        },
        __EMPTY__,
        body: body
      })
    }),
    deleteApiUserUsername: build.mutation<
      deleteApiUserUsernameResponse,
      deleteApiUserUsernameArgs
    >({
      query: queryArg => ({
        path: `/user/${queryArg.username}`,
        method: DELETE,
        params: {
          username: queryArg.username
        },
        __EMPTY__,
        __EMPTY__
      })
    })
  }),
  overrideExisting: false
})

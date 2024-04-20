import { pet, order } from 'src/index.tsx'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { customer } from 'src/schemas/Customer.ts'

export const getApiPetPetIdTempTempIdArgs = z.object({
  petId: z.number().int()
})
export type GetApiPetPetIdTempTempIdArgs = z.infer<
  typeof getApiPetPetIdTempTempIdArgs
>
export const getApiStoreOrderOrderIdArgs = z.object({
  orderId: z.number().int()
})
export type GetApiStoreOrderOrderIdArgs = z.infer<
  typeof getApiStoreOrderOrderIdArgs
>
export const getApiUserUsernameArgs = z.object({ username: z.string() })
export type GetApiUserUsernameArgs = z.infer<typeof getApiUserUsernameArgs>

const getApiPetFindByStatusFn = async () => {
  const res = await fetch(`/pet/findByStatus`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(pet).parse(data)
}

export const useGetApiPetFindByStatusFn = () => {
  const result = useQuery({
    queryKey: ['pet'],
    queryFn: () => getApiPetFindByStatusFn(),
    enabled: Boolean()
  })

  return result
}

const getApiPetFindByTagsFn = async () => {
  const res = await fetch(`/pet/findByTags`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.array(pet).parse(data)
}

export const useGetApiPetFindByTagsFn = () => {
  const result = useQuery({
    queryKey: ['pet'],
    queryFn: () => getApiPetFindByTagsFn(),
    enabled: Boolean()
  })

  return result
}

const getApiPetPetIdTempTempIdFn = async (petId: string | undefined) => {
  const res = await fetch(`/pet/${petId}/temp/${tempId}`, {
    method: 'GET'
  })

  const data = await res.json()

  return pet.parse(data)
}

export const useGetApiPetPetIdTempTempIdFn = (petId: string | undefined) => {
  const result = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => getApiPetPetIdTempTempIdFn(petId),
    enabled: Boolean(petId)
  })

  return result
}

const getApiStoreInventoryFn = async () => {
  const res = await fetch(`/store/inventory`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.record(z.string(), z.number().int()).parse(data)
}

export const useGetApiStoreInventoryFn = () => {
  const result = useQuery({
    queryKey: ['store'],
    queryFn: () => getApiStoreInventoryFn(),
    enabled: Boolean()
  })

  return result
}

const getApiStoreOrderOrderIdFn = async (orderId: string | undefined) => {
  const res = await fetch(`/store/order/${orderId}`, {
    method: 'GET'
  })

  const data = await res.json()

  return order.parse(data)
}

export const useGetApiStoreOrderOrderIdFn = (orderId: string | undefined) => {
  const result = useQuery({
    queryKey: ['store', orderId],
    queryFn: () => getApiStoreOrderOrderIdFn(orderId),
    enabled: Boolean(orderId)
  })

  return result
}

const getApiUserLoginFn = async () => {
  const res = await fetch(`/user/login`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.string().parse(data)
}

export const useGetApiUserLoginFn = () => {
  const result = useQuery({
    queryKey: ['user'],
    queryFn: () => getApiUserLoginFn(),
    enabled: Boolean()
  })

  return result
}

const getApiUserLogoutFn = async () => {
  const res = await fetch(`/user/logout`, {
    method: 'GET'
  })

  const data = await res.json()

  return z.void().parse(data)
}

export const useGetApiUserLogoutFn = () => {
  const result = useQuery({
    queryKey: ['user'],
    queryFn: () => getApiUserLogoutFn(),
    enabled: Boolean()
  })

  return result
}

const getApiUserUsernameFn = async (username: string | undefined) => {
  const res = await fetch(`/user/${username}`, {
    method: 'GET'
  })

  const data = await res.json()

  return customer.parse(data)
}

export const useGetApiUserUsernameFn = (username: string | undefined) => {
  const result = useQuery({
    queryKey: ['user', username],
    queryFn: () => getApiUserUsernameFn(username),
    enabled: Boolean(username)
  })

  return result
}

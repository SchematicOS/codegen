import { pet, apiResponse, order, user } from 'src/index.tsx'
import { z } from 'zod'

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

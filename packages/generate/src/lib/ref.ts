import { OasComponentType, OasRef } from '@schematicos/types'

export const toRefName = ($ref: string) => {
  // TODO: Add validation here to ensure reference exists
  const refName = $ref.split('/').slice(-1)[0]

  if (!refName) {
    throw new Error('Invalid reference')
  }

  return refName
}

export const isRef = (arg: OasRef | OasComponentType): arg is OasRef => {
  return arg.schematicType === 'ref'
}

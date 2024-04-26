import type { OasRef } from '../oasElements/Ref.ts'
import type { OasRefData } from '../oasTypes/ref.ts'

export const toRefName = ($ref: string): string => {
  // TODO: Add validation here to ensure reference exists
  const refName = $ref.split('/').slice(-1)[0]

  if (!refName) {
    throw new Error('Invalid reference')
  }

  return refName
}

export const isRef = <T extends OasRefData['refType']>(
  arg: unknown
): arg is OasRef<T> => {
  if (!arg) {
    return false
  }
  if (typeof arg !== 'object') {
    return false
  }

  if ('schematicType' in arg && arg.schematicType === 'ref') {
    return true
  }

  return false
}
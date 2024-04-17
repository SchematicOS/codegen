export const stripUndefinedRecursive = <T extends Record<string, unknown>>(
  objectValue: T
): T => {
  return Object.fromEntries(
    Object.entries(objectValue)
      .filter(([, keyValue]) => {
        return keyValue !== undefined
      })
      .map(([key, keyValue]) => {
        if (
          typeof keyValue === 'object' &&
          keyValue !== null &&
          !Array.isArray(keyValue)
        ) {
          return [
            key,
            stripUndefinedRecursive(keyValue as Record<string, unknown>)
          ]
        } else {
          return [key, keyValue]
        }
      })
  ) as T
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export const stripUndefined = <T extends Record<string, any>>(
  input: T
): NoUndefinedField<T> => {
  const filteredEntries = Object.entries(input).filter(([key, value]) => {
    return typeof value !== 'undefined'
  })

  return Object.fromEntries(filteredEntries) as NoUndefinedField<T>
}

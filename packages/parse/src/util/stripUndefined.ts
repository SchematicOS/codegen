export const stripUndefined = <T extends Record<string, unknown>>(
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
          return [key, stripUndefined(keyValue as Record<string, unknown>)]
        } else {
          return [key, keyValue]
        }
      })
  ) as T
}

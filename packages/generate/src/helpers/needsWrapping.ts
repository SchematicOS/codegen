export const needsWrapping = (str: string):boolean => {
  return /-/.test(str)
}

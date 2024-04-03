export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const decapitalize = (str: string) => {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1)
}

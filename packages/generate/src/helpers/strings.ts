export const capitalize = (str: string):string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const decapitalize = (str: string):string => {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1)
}

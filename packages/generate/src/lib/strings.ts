import { ImportName } from '@schematicos/types'

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const decapitalize = (str: string) => {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1)
}

export const capitalizeImportName = (name: ImportName) => {
  if (typeof name === 'string') {
    return capitalize(name)
  }

  return Object.fromEntries(
    Object.entries(name).map(([key, value]) => {
      return [capitalize(key), capitalize(value)]
    })
  )
}

export const decapitalizeImportName = (name: ImportName) => {
  if (typeof name === 'string') {
    return decapitalize(name)
  }

  return Object.fromEntries(
    Object.entries(name).map(([key, value]) => {
      return [decapitalize(key), decapitalize(value)]
    })
  )
}

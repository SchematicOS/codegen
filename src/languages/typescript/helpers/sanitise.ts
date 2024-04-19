import { needsWrapping } from 'typescript/helpers/needsWrapping.ts'

export const sanitiseKey = (key: string): string => {
  return needsWrapping(key) ? `'${key}'` : key
}

export const sanitisePropertyName = (name: string, parent: string): string => {
  return needsWrapping(name) ? `${parent}['${name}']` : `${parent}.${name}`
}

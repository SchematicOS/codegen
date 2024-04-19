import { isIdentifierName } from 'npm:@babel/helper-validator-identifier'

export const sanitiseKey = (key: string): string => {
  return isIdentifierName(key) ? `'${key}'` : key
}

export const sanitisePropertyName = (name: string, parent: string): string => {
  return isIdentifierName(name) ? `${parent}['${name}']` : `${parent}.${name}`
}

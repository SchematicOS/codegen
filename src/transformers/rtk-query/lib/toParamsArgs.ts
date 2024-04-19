import { EMPTY } from 'generate/constants.ts'
import { Key } from 'generate/elements/Key.ts'
import { Property } from 'typescript/lib/Property.ts'
import type { OasParameterData } from '@schematicos/types'

type ToParamsArgs = {
  parameters: OasParameterData[]
  parentPath: string
}

export const toParamsArgs = ({ parameters, parentPath }: ToParamsArgs) => {
  if (!parameters.length) {
    return EMPTY
  }

  const params = parameters.map(({ name }) => {
    return `${Key.create(name)}: ${Property.create({
      parentPath,
      property: name
    })}`
  })

  return `{\n${params.join(',\n')}\n}`
}

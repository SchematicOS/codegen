import { EMPTY } from '../../generate/constants.ts'
import { Key } from 'generate/elements/Key.ts'
import { Property } from 'generate/elements/Property.ts'
import type { OasParameter } from '@schematicos/types'

type ToParamsArgs = {
  parameters: OasParameter[]
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

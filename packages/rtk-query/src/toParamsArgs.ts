import { EMPTY } from 'jsr:@schematicos/generate@0.0.2/constants'
import { Key } from 'jsr:@schematicos/generate@0.0.2/Key'
import { Property } from 'jsr:@schematicos/generate@0.0.2/Property'
import type { OasParameter } from 'npm:@schematicos/types@0.0.34'

type ToParamsArgs = {
  parameters: OasParameter[]
  parentPath: string
}

export const toParamsArgs = ({ parameters, parentPath }: ToParamsArgs) => {
  if (!parameters.length) {
    return EMPTY
  }

  const params = parameters.map(({ name }) => {
    return `${Key.create(name)}: ${Property.create({ parentPath, property: name })}`
  })

  return `{\n${params.join(',\n')}\n}`
}

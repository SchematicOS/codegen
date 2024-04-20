import type { OasOperation } from 'parse/elements/Operation.ts'

const toUrlParams = (operation: OasOperation) => {
  operation.parameters
    ?.map(parameter => parameter.resolve())
    .filter(({ location }) => location === 'path' || location === 'query')
    .map(parameter => ({
      name: parameter.name,
      location: parameter.location,
      schema: parameter.toSchema()?.resolve()
    }))
}

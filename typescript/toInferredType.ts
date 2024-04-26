import { Definition } from '../dsl/Definition.ts'
import { Identifier } from '../dsl/Identifier.ts'
import { capitalize } from '../helpers/strings.ts'
import { EntityType } from './EntityType.ts'

export const toInferredType = (valueIdentifier: Identifier): Definition => {
  const { context, modelSettings } = valueIdentifier

  const typeIdentifier = Identifier.create({
    name: capitalize(valueIdentifier.name),
    modelSettings,
    type: EntityType.create('type'),
    context
  })

  return Definition.create({
    identifier: typeIdentifier,
    children: context.toInferType(valueIdentifier),
    destinationPath: modelSettings.getExportPath(),
    description: undefined,
    context
  })
}

import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { capitalize } from 'generate/helpers/strings.ts'
import { EntityType } from './lib/EntityType.ts'

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

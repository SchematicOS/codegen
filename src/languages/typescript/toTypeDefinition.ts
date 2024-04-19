import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { capitalize } from 'generate/helpers/strings.ts'
import { EntityType } from './lib/EntityType.ts'

export const toTypeDefinition = (valueIdentifier: Identifier): Definition => {
  const { context, sourcePath, modelSettings } = valueIdentifier

  const typeIdentifier = Identifier.create({
    name: capitalize(valueIdentifier.name),
    sourcePath,
    modelSettings,
    type: EntityType.create('type'),
    context
  })

  const inferred = context.toInferType(valueIdentifier)

  return Definition.create({
    identifier: typeIdentifier,
    children: inferred,
    destinationPath: sourcePath,
    context
  })
}

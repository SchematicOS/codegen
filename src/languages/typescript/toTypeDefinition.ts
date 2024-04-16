import { Definition } from 'generate/elements/Definition.ts'
import { Identifier } from 'generate/elements/Identifier.ts'
import { capitalize } from 'generate/helpers/strings.ts'
import { EntityType } from 'typescript/EntityType.ts'

export const toTypeDefinition = (valueIdentifier: Identifier): Definition => {
  const { context, source, modelSettings } = valueIdentifier

  const typeIdentifier = Identifier.create({
    name: capitalize(valueIdentifier.name),
    source,
    modelSettings,
    type: EntityType.create('type'),
    context
  })

  const inferred = context.toInferType(valueIdentifier)

  const inferredTypeDefinition = Definition.create({
    identifier: typeIdentifier,
    children: inferred,
    destinationPath: source,
    context
  })

  context.registerDefinition(inferredTypeDefinition)

  return inferredTypeDefinition
}

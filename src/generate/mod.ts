import type { Transformer } from './types.ts'
import { Identifier } from './elements/Identifier.ts'
import { Definition } from './elements/Definition.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { CoreContext } from 'core/lib/CoreContext.ts'

type GenerateArgs = {
  schemaModel: OasDocument
  transformers: Transformer[]
  context: CoreContext
}

export const generate = ({
  schemaModel,
  transformers,
  context
}: GenerateArgs) => {
  transformers.forEach(({ id, transform }) => {
    console.log(id)

    const transformerSettings = context.settings.getTransformerSettings(id)
    transform({ context, transformerSettings })

    console.log('')
  })

  Object.entries(schemaModel.components?.schemas ?? {})
    .map(([$ref, value]) => {
      const identifier = Identifier.from$Ref({ $ref, context })

      return { value, identifier }
    })
    .filter(({ identifier }) => identifier.modelSettings.isSelected())
    .forEach(({ value, identifier }) => {
      const definition = Definition.fromValue({
        context,
        value,
        identifier,
        description: value.description,
        destinationPath: identifier.modelSettings.getExportPath()
      })

      context.register({
        definitions: [definition],
        destinationPath: definition.destinationPath
      })
    })
}

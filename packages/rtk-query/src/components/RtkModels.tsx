import {
  // toRefName,
  useTransformer,
  Identifier,
  Value,
  File,
  Definition
} from '@schematicos/generate'
// import { defaultExportPath } from '@schematicos/types'

export const RtkModels = () => {
  const ctx = useTransformer()

  const { schemaModel, settingsConfig } = ctx

  // const destination = settingsConfig?.exportPath ?? defaultExportPath

  return Object.entries(schemaModel.components?.models ?? {})
    .filter(([key]) => {
      // @TODO handle skipping registered models in File handler
      // const refSource =
      //   settingsConfig?.components?.models?.[key]?.exportPath ?? destination

      // const refName = toRefName(key)
      // const definitions = ctx.files.get(refSource)?.definitions
      // const isRegistered = definitions?.has(refName)

      // // skip if model already registered
      // if (isRegistered) {
      //   return false
      // }

      // include if no settingsConfig supplied
      if (!settingsConfig) {
        return true
      }

      const modelConfig = settingsConfig?.components?.models?.[key]

      // include if required by modelConfig
      if (modelConfig?.selected) {
        return true
      }

      return false
    })
    .map(([$ref, value]) => {
      const identifier = Identifier.from$Ref({
        $ref,
        type: ctx.typeSystem.type,
        ctx
      })

      return (
        <File key={identifier.toLabelName()} destination={identifier.source}>
          <Definition identifier={identifier}>
            <Value value={value} required />
          </Definition>
        </File>
      )
    })
}

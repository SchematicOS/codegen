import type {
  PrettierConfigType,
  OasRoot,
  SettingsType
} from '@schematicos/types'
import * as prettier from 'prettier/standalone'
import typescript from 'prettier/plugins/typescript'
import estree from 'prettier/plugins/estree'
import invariant from 'tiny-invariant'
import { GenerateContext } from './context/GenerateContext.ts'
import { Settings } from './settings/Settings.ts'
import { ContextData } from './context/ContextData.ts'
import type { TypeSystem, Transformer } from './types.ts'
import { Identifier } from './elements/Identifier.ts'
import { Definition } from './elements/Definition.ts'

type GenerateArgs = {
  schemaModel: OasRoot
  settingsConfig?: SettingsType
  prettierConfig?: PrettierConfigType
  transformers: Transformer[]
  typeSystem: TypeSystem
}

export const generate = async ({
  schemaModel,
  settingsConfig = {},
  prettierConfig,
  transformers,
  typeSystem
}: GenerateArgs): Promise<Record<string, string>> => {
  const settings = new Settings(settingsConfig)

  const contextData = new ContextData({
    files: new Map(),
    schemaModel,
    settings,
    typeSystem
  })

  const context = new GenerateContext({ data: contextData })

  transformers.forEach(({ id, transform }) => {
    transform({
      context,
      transformerSettings: settings.getTransformerSettings(id)
    })
  })

  Object.entries(schemaModel.components?.models ?? {})
    .map(([$ref, value]) => {
      const identifier = Identifier.from$Ref({
        $ref,
        context
      })

      return { value, identifier }
    })
    .filter(({ identifier }) => identifier.modelSettings.isSelected())
    .forEach(({ value, identifier }) => {
      const definition = Definition.fromValue({
        context,
        value,
        identifier,
        destinationPath: identifier.modelSettings.getExportPath()
      })

      context.register({
        definition,
        destinationPath: definition.destinationPath
      })
    })

  const artifactsMap = context.render()

  if (!prettierConfig) {
    return artifactsMap
  }

  return await prettifyArtifacts(artifactsMap, prettierConfig)
}

export const prettifyArtifacts = async (
  artifactsMap: Record<string, string>,
  prettierConfig?: PrettierConfigType
): Promise<Record<string, string>> => {
  if (!prettierConfig) {
    return artifactsMap
  }

  const artifactPromises = Object.values(artifactsMap).map(artifact => {
    return prettier.format(artifact, {
      parser: 'typescript',
      plugins: [estree, typescript],
      ...prettierConfig
    })
  })

  const prettifiedArtifacts = await Promise.all(artifactPromises)

  const prettifiedArtifactEntries: [string, string][] = Object.keys(
    artifactsMap
  ).map((key, index): [string, string] => {
    const prettifiedArtifact = prettifiedArtifacts[index]

    invariant(prettifiedArtifact, 'Prettified artifact is undefined')

    return [key, prettifiedArtifact]
  })

  return Object.fromEntries(prettifiedArtifactEntries)
}

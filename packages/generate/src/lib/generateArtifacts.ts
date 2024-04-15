import type {
  PrettierConfigType,
  OasRoot,
  SettingsConfigType
} from 'npm:@schematicos/types@0.0.34'
import * as prettier from 'npm:prettier@3.2.5/standalone'
import typescript from 'npm:prettier@3.2.5/plugins/typescript'
import estree from 'npm:prettier@3.2.5/plugins/estree'
import invariant from 'npm:tiny-invariant@1.3.3'
import { GenerateContext } from './GenerateContext.ts'
import { Settings } from './Settings.ts'
import { ContextData } from './ContextData.ts'
import type { TypeSystem, Transformer } from '../types.ts';
import { Identifier } from '../elements/Identifier.ts';
import { Model } from '../elements/Model.ts';

type GenerateArtifactsArgs = {
  schemaModel: OasRoot
  settingsConfig: SettingsConfigType
  prettierConfig?: PrettierConfigType
  transformers: Transformer[]
  typeSystem: TypeSystem
}

export const generateArtifacts = async ({
  schemaModel,
  settingsConfig,
  prettierConfig,
  transformers,
  typeSystem
}: GenerateArtifactsArgs):Promise<Record<string, string>> => {
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

      const model = Model.create({
        context,
        value,
        identifier,
        destinationPath: identifier.modelSettings.getExportPath()
      })

      return model
    })
    .filter(model => {
      return model.isSelected()
    })
    .forEach(model => {
      context.registerModel(model)
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
):Promise<Record<string, string>> => {
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

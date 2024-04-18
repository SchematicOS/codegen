import type { PrettierConfigType, SettingsType } from '@schematicos/types'
import { format } from 'prettier/standalone'
import typescript from 'prettier/plugins/typescript'
import estree from 'prettier/plugins/estree'
import invariant from 'tiny-invariant'
import { GenerateContext } from 'core/lib/GenerateContext.ts'
import { Settings } from './settings/Settings.ts'
import { ContextData } from 'core/lib/ContextData.ts'
import type { TypeSystem, Transformer } from './types.ts'
import { Identifier } from './elements/Identifier.ts'
import { Definition } from './elements/Definition.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { Reporter } from 'core/lib/Reporter.ts'

type GenerateArgs = {
  schemaModel: OasDocument
  settings?: SettingsType
  prettier?: PrettierConfigType
  transformers: Transformer[]
  typeSystem: TypeSystem
  reporter: Reporter
}

export const generate = async ({
  schemaModel,
  settings: s = {},
  prettier,
  transformers,
  typeSystem,
  reporter
}: GenerateArgs): Promise<Record<string, string>> => {
  const settings = Settings.create(s)

  const contextData = new ContextData({
    files: new Map(),
    schemaModel,
    settings,
    typeSystem
  })

  const context = GenerateContext.create({ data: contextData, reporter })

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

  if (!prettier) {
    return artifactsMap
  }

  return await prettifyArtifacts(artifactsMap, prettier)
}

export const prettifyArtifacts = async (
  artifactsMap: Record<string, string>,
  prettier?: PrettierConfigType
): Promise<Record<string, string>> => {
  if (!prettier) {
    return artifactsMap
  }

  const artifactPromises = Object.values(artifactsMap).map(artifact => {
    return format(artifact, {
      parser: 'typescript',
      plugins: [estree, typescript],
      ...prettier
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

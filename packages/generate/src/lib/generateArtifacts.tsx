import {
  PrettierConfigType,
  OasRoot,
  SettingsConfigType,
  LoadedTransformer,
  LoadedTypeSystem
} from '@schematicos/types'
import * as prettier from 'prettier/standalone'
import typescript from 'prettier/plugins/typescript'
import estree from 'prettier/plugins/estree'
import invariant from 'tiny-invariant'
import { schematicRender } from '@/lib/schematicRender.ts'
import { ErrorBoundary } from '@/lib/ErrorBoundary.tsx'
import { Generate } from '@/lib/Generate.tsx'
import { GenerateContext } from '@/lib/GenerateContext.ts'
import { TransformerProvider } from '@schematicos/generate'
import { useGenerate } from '@/lib/GenerateProvider.tsx'
import { ComponentType } from 'react'

type GenerateArtifactsArgs = {
  schemaModel: OasRoot
  settingsConfig: SettingsConfigType
  prettierConfig?: PrettierConfigType
  transformers: LoadedTransformer[]
  typeSystem: LoadedTypeSystem
}

export const generateArtifacts = async ({
  schemaModel,
  settingsConfig,
  prettierConfig,
  transformers,
  typeSystem
}: GenerateArtifactsArgs) => {
  const ctx = new GenerateContext({
    schemaModel,
    settingsConfig,
    prettierConfig,
    transformers,
    typeSystem
  })

  const artifactsMap = await schematicRender(
    <ErrorBoundary>
      <Generate ctx={ctx}>
        {transformers.map(({ id, component }) => (
          <TransformerWrapper key={id} id={id} component={component} />
        ))}
      </Generate>
    </ErrorBoundary>,
    ctx
  )

  return prettierConfig
    ? prettifyArtifacts(artifactsMap, prettierConfig)
    : artifactsMap
}

type TransformerWrapperProps = {
  id: string
  component: ComponentType
}

const TransformerWrapper = ({
  id,
  component: Component
}: TransformerWrapperProps) => {
  const { ctx } = useGenerate()

  const { schemaModel, settingsConfig } = ctx

  const { transformers, ...rest } = settingsConfig

  return (
    <TransformerProvider
      ctx={{
        schemaModel,
        settingsConfig: {
          ...rest,
          transformer: transformers?.[id]
        },
        registerImports: ctx.registerImports.bind(ctx),
        resolveRef: ctx.resolveRef.bind(ctx),
        typeSystem: ctx.typeSystem
      }}
    >
      <Component />
    </TransformerProvider>
  )
}

export const prettifyArtifacts = async (
  artifactsMap: Record<string, string>,
  prettierConfig?: PrettierConfigType
) => {
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

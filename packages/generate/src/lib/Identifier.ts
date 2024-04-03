import { TransformerContextType } from '@/lib/TransformerProvider.tsx'
import { toRefName } from '@/lib/ref.ts'
import {
  ImportName,
  ModelConfigType,
  defaultExportPath
} from '@schematicos/types'

type IdentifierType = 'value' | 'type' | 'static'

type IdentifierArgs = {
  name: ImportName
  source: string
  modelConfig: ModelConfigType | undefined
  type: IdentifierType
  ctx: TransformerContextType
}

type FromValueArgs = {
  name: ImportName
  source?: string
  modelConfig: ModelConfigType | undefined
  type: IdentifierType
  ctx: TransformerContextType
}

type FromStaticArgs = {
  name: ImportName
  module: string
  ctx: TransformerContextType
}

type From$RefArgs = {
  $ref: string
  type: IdentifierType
  ctx: TransformerContextType
}

type ConvertArgs = {
  type: IdentifierType
  rename: (name: ImportName) => ImportName
}

export class Identifier {
  name: ImportName
  /** source is where Identifier is defined */
  source: string
  modelConfig: ModelConfigType | undefined
  type: IdentifierType
  ctx: TransformerContextType

  private constructor({
    name,
    source,
    modelConfig,
    type,
    ctx
  }: IdentifierArgs) {
    this.name = name
    this.source = source
    this.modelConfig = modelConfig
    this.type = type
    this.ctx = ctx
  }

  static fromValue({ name, source, modelConfig, type, ctx }: FromValueArgs) {
    return new Identifier({
      name,
      // Identifiers created at runtime have source specified on creation
      // Identifiers created from a schema ref use custom or default export path
      source:
        source ??
        modelConfig?.exportPath ??
        ctx.settingsConfig?.exportPath ??
        defaultExportPath,
      modelConfig,
      type,
      ctx
    })
  }

  static fromStatic({ name, module, ctx }: FromStaticArgs) {
    return new Identifier({
      name,
      source: module,
      modelConfig: undefined,
      type: 'static',
      ctx
    })
  }

  static from$Ref({ $ref, type, ctx }: From$RefArgs) {
    const refName = toRefName($ref)

    const modelConfig = ctx.settingsConfig?.components?.models?.[refName]

    return Identifier.fromValue({
      name: refName,
      modelConfig,
      type,
      ctx
    })
  }

  convert({ type, rename }: ConvertArgs) {
    if (this.type === 'static') {
      throw new Error('Cannot convert static identifier')
    }

    return Identifier.fromValue({
      name: rename(this.name),
      source: this.source,
      modelConfig: this.modelConfig,
      type: type,
      ctx: this.ctx
    })
  }

  toImportFrom() {
    return this.modelConfig?.importFrom ?? this.source
  }

  isImported(destination: string) {
    // If relative path is used then we'll need to
    // resolve them to compare actual locations
    return this.source !== destination
  }

  toString() {
    return typeof this.name === 'string'
      ? this.name
      : Object.entries(this.name)
          .map(([key, value]) => (key === value ? value : `${key} as ${value}`))
          .join(', ')
  }

  toLabelName() {
    if (typeof this.name === 'string') {
      return this.name
    }

    const [name, ...rest] = Object.values(this.name)

    if (rest?.length) {
      throw new Error('Cannot convert multiple names to a single label name')
    }

    return name
  }

  /** Returns label for render in imports */
  toImportName() {
    return typeof this.name === 'string'
      ? this.name
      : Object.entries(this.name)
          .map(([key, value]) => (key === value ? value : `${key} as ${value}`))
          .join(', ') // Join is not needed since there should only be one entry
  }
}

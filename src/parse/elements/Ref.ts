import { OasBase } from 'parse/elements/OasBase.ts'
import type { OasRefData } from '@schematicos/types'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Trail } from 'core/lib/Trail.ts'
import type { OasComponentType } from 'generate/types.ts'
import { toRefName } from 'generate/helpers/ref.ts'
import { match } from 'ts-pattern'

const MAX_LOOKUPS = 10

export type RefFields<T extends OasRefData['refType']> = {
  refType: T
  $ref: string
  summary?: string
  description?: string
}

type ToRefV3Args<T extends OasRefData['refType']> = {
  fields: RefFields<T>
  trail: Trail
  context: CoreContext
  skipped: Record<string, unknown>
}

export class OasRef<T extends OasRefData['refType']> extends OasBase {
  schematicType: 'ref' = 'ref'
  fields: RefFields<T>

  private constructor({ fields, trail, skipped, context }: ToRefV3Args<T>) {
    super({ trail, skipped, context })

    this.fields = fields
  }

  static create<T extends OasRefData['refType']>({
    fields,
    trail,
    context,
    skipped
  }: ToRefV3Args<T>) {
    return new OasRef({ fields, trail, context, skipped })
  }

  resolve(lookupsPerformed: number = 0): ResolvedRef<T> {
    if (lookupsPerformed >= MAX_LOOKUPS) {
      throw new Error('Max lookups reached')
    }

    const resolved = this.resolveOnce()

    return resolved.isRef() ? resolved.resolve(lookupsPerformed + 1) : resolved
  }

  isRef(): this is OasRef<T> {
    return true
  }

  resolveOnce(): OasRef<T> | ResolvedRef<T> {
    const c = this.context.schemaModel.components

    const refName = toRefName(this.$ref)

    const refType: OasRefData['refType'] = this.refType

    const resolved = match(refType)
      .with('schema', () => c?.models?.[refName])
      .with('requestBody', () => c?.requestBodies?.[refName])
      .with('parameter', () => c?.parameters?.[refName])
      .with('response', () => c?.responses?.[refName])
      .with('example', () => c?.examples?.[refName])
      .with('header', () => c?.headers?.[refName])
      .exhaustive()

    if (!resolved) {
      this.context.error({
        trail: this.trail,
        message: `Ref "${this.fields.$ref}" not found`
      })
    }

    if (resolved.isRef()) {
      if (resolved.refType !== this.refType) {
        this.context.error({
          trail: this.trail,
          message: `Ref type mismatch for "${this.$ref}". Expected "${this.refType}" but got "${resolved.refType}"`
        })
      }
    } else {
      if (resolved.schematicType !== this.refType) {
        this.context.error({
          trail: this.trail,
          message: `Type mismatch for "${this.$ref}". Expected "${this.refType}" but got "${resolved.schematicType}"`
        })
      }
    }

    return resolved as OasRef<T> | ResolvedRef<T>
  }

  get $ref() {
    return this.fields.$ref
  }

  get refType() {
    return this.fields.refType
  }

  get summary() {
    return this.fields.summary
  }

  get description() {
    return this.fields.description
  }
}

export type ResolvedRef<T extends OasRefData['refType']> = Extract<
  OasComponentType,
  { schematicType: T }
>

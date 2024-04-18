import type { ParseContext } from 'core/lib/ParseContext.ts'
import type {
  FileContents,
  GenerateContext,
  RegisterArgs
} from 'core/lib/GenerateContext.ts'
import type { RenderContext } from 'core/lib/RenderContext.ts'
import type { ReportArgs, Reporter } from 'core/lib/Reporter.ts'
import { match } from 'ts-pattern'
import type { OasRefData, Stringable } from '@schematicos/types'
import type {
  RefToResolved,
  TypeSystem,
  TypeSystemArgs
} from 'generate/types.ts'
import type { OasDocument } from 'parse/elements/Document.ts'
import type { Settings } from 'generate/settings/Settings.ts'

type SharedContext =
  | {
      type: 'parse'
      context: ParseContext
    }
  | {
      type: 'generate'
      context: GenerateContext
    }
  | {
      type: 'render'
      context: RenderContext
    }

type CoreContextArgs = {
  phase: SharedContext
  reporter: Reporter
}

export class CoreContext {
  reporter: Reporter
  phase: SharedContext

  private constructor({ phase, reporter }: CoreContextArgs) {
    this.phase = phase
    this.reporter = reporter
  }

  static create({ phase, reporter }: CoreContextArgs) {
    return new CoreContext({ phase, reporter })
  }

  report({ level, phase, trail, message }: ReportArgs): void {
    this.reporter.report({ level, phase, trail, message })
  }

  register({ destinationPath, ...args }: RegisterArgs) {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.register({ destinationPath, ...args })
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot register in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot register in render phase')
      })
      .exhaustive()
  }

  getFile(filePath: string): FileContents {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.getFile(filePath)
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot get file in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot get file in render phase')
      })
      .exhaustive()
  }

  render(): Record<string, string> {
    return match(this.phase)
      .with({ type: 'generate' }, () => {
        throw new Error('Cannot render in parse phase')
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot render in parse phase')
      })
      .with({ type: 'render' }, ({ context }) => context.render())
      .exhaustive()
  }

  resolveRefSingle<T extends OasRefData>(arg: T): RefToResolved<T> | T {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.resolveRefSingle(arg)
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot resolve ref in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot resolve ref in render phase')
      })
      .exhaustive()
  }

  resolveRef<T extends OasRefData>(
    arg: T,
    lookupsPerformed: number = 0
  ): RefToResolved<T> {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.resolveRef(arg, lookupsPerformed)
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot resolve ref in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot resolve ref in render phase')
      })
      .exhaustive()
  }

  addFile(normalisedPath: string) {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.addFile(normalisedPath)
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot add file in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot add file in render phase')
      })
      .exhaustive()
  }

  toTypeSystem({
    value,
    required,
    destinationPath
  }: Omit<TypeSystemArgs, 'context'>): Stringable {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.toTypeSystem({ value, required, destinationPath })
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access type system in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot access type system in render phase')
      })
      .exhaustive()
  }

  toInferType(value: Stringable) {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => {
        return context.toInferType(value)
      })
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access type system in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot access type system in render phase')
      })
      .exhaustive()
  }

  get files(): Map<string, FileContents> {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => context.files)
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access files in parse phase')
      })
      .with({ type: 'render' }, ({ context }) => context.files)
      .exhaustive()
  }

  get schemaModel(): OasDocument {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => context.schemaModel)
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access schema model in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot access schema model in render phase')
      })
      .exhaustive()
  }

  get settings(): Settings {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => context.settings)
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access settings in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot access settings in render phase')
      })
      .exhaustive()
  }

  get typeSystemInfo(): Omit<TypeSystem, 'create'> {
    return match(this.phase)
      .with({ type: 'generate' }, ({ context }) => context.typeSystemInfo)
      .with({ type: 'parse' }, () => {
        throw new Error('Cannot access type system in parse phase')
      })
      .with({ type: 'render' }, () => {
        throw new Error('Cannot access type system in render phase')
      })
      .exhaustive()
  }
}

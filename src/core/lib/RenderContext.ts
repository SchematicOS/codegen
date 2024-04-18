import type { Stringable } from '@schematicos/types'
import type { ContextData } from './ContextData.ts'
import { Import } from '../../generate/elements/Import.ts'
import type { ReportArgs } from 'core/lib/Reporter.ts'
import type { Reporter } from 'core/lib/Reporter.ts'

type FileContents = {
  imports: Map<string, Set<string>>
  definitions: Map<string, Stringable>
  content: Stringable[]
}

type ConstructorArgs = {
  data: ContextData
  reporter: Reporter
}

export class RenderContext {
  private contextData: ContextData
  private reporter: Reporter

  private constructor({ data, reporter }: ConstructorArgs) {
    this.contextData = data
    this.reporter = reporter
  }

  static create(args: ConstructorArgs) {
    return new RenderContext(args)
  }

  render(): Record<string, string> {
    if (this.contextData.rendering) {
      throw new Error('Render already in progress')
    }

    this.contextData.rendering = true

    const fileEntries = Array.from(this.files.entries()).map(
      ([destination, file]): [string, string] => {
        const imports = Array.from(file.imports.entries()).map(
          ([module, importNamesSet]) => {
            return Import.create(module, Array.from(importNamesSet))
          }
        )

        const fileContents = [
          imports,
          Array.from(file.definitions.values()),
          file.content
        ]
          .filter((section): section is Stringable[] =>
            Boolean(section?.length)
          )
          .map(section => section.join('\n'))
          .join('\n\n')

        return [destination, fileContents]
      }
    )

    return Object.fromEntries(fileEntries)
  }

  report({ level, phase, trail, message }: ReportArgs): void {
    this.reporter.report({ level, phase, trail, message })
  }

  get files(): Map<string, FileContents> {
    return this.contextData.files
  }
}

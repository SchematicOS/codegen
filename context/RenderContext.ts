import type { Stringable } from 'types/schematic/stringable.ts'
import type { PrettierConfigType } from 'types/schematic/prettierConfig.ts'
import { Import } from 'generate/elements/Import.ts'
import type { ReportArgs } from './Reporter.ts'
import type { Reporter } from './Reporter.ts'
import { format } from 'prettier/standalone'
import typescript from 'prettier/plugins/typescript'
import estree from 'prettier/plugins/estree'
import invariant from 'tiny-invariant'

type FileContents = {
  imports: Map<string, Set<string>>
  definitions: Map<string, Stringable>
  content: Stringable[]
}

type ConstructorArgs = {
  files: Map<string, FileContents>
  reporter: Reporter
  prettier?: PrettierConfigType
}

export class RenderContext {
  files: Map<string, FileContents>
  private reporter: Reporter
  private prettier?: PrettierConfigType

  private constructor({ files, reporter, prettier }: ConstructorArgs) {
    this.files = files
    this.reporter = reporter
    this.prettier = prettier
  }

  static create(args: ConstructorArgs): RenderContext {
    return new RenderContext(args)
  }

  async render(): Promise<Record<string, string>> {
    const artifactsMap = this.collate()
    return await this.format(artifactsMap)
  }

  private collate(): Record<string, string> {
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

  private async format(artifactsMap: Record<string, string>) {
    if (!this.prettier) {
      return artifactsMap
    }

    const artifactPromises = Object.values(artifactsMap).map(artifact => {
      return format(artifact, {
        parser: 'typescript',
        plugins: [estree, typescript],
        ...this.prettier
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

  report({ level, phase, trail, message }: ReportArgs): void {
    this.reporter.report({ level, phase, trail, message })
  }
}

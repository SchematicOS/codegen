import type { Stringable } from '../dsl/Stringable.ts'

export type PhaseType = 'parse' | 'group' | 'render'

type ImportOptions = {
  external: boolean
}

type ImportContent = {
  importNames: Set<string>
  options: ImportOptions
}
export type FileContents = {
  imports: Map<string, ImportContent>
  definitions: Map<string, Stringable>
  content: Stringable[]
}

export type RenderOptions = {
  packageJson: boolean
}

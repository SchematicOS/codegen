import type { ReportArgs, Reporter } from 'core/lib/Reporter.ts'

type ParseContextArgs = {
  reporter?: Reporter | undefined
}

export class ParseContext {
  private reporter: Reporter | undefined

  private constructor({ reporter }: ParseContextArgs) {
    this.reporter = reporter
  }

  static create({ reporter }: ParseContextArgs = {}): ParseContext {
    return new ParseContext({ reporter })
  }

  report({ level, phase, trail, message }: ReportArgs) {
    this.reporter?.report({ level, phase, trail, message })
  }
}

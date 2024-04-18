import type { Trail } from './Trail.ts'

type ReporterArgs = {
  destination: (args: ReportArgs) => void
  logLevel: LogLevel
}

const LOG_LEVELS = {
  info: 1,
  warn: 3,
  error: 5
}

export class Reporter {
  destination: (args: ReportArgs) => void
  logLevel: LogLevel

  private constructor({ destination, logLevel }: ReporterArgs) {
    this.destination = destination
    this.logLevel = logLevel
  }

  static create({ destination, logLevel }: ReporterArgs): Reporter {
    return new Reporter({ destination, logLevel })
  }

  report({ level, phase, trail, message }: ReportArgs) {
    if (this.shouldLog(level)) {
      this.destination({ level, phase, trail, message })
    }
  }

  shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.logLevel]
  }
}

type PhaseType = 'parse' | 'group' | 'render'

type LogLevel = keyof typeof LOG_LEVELS

export type ReportArgs = {
  level: LogLevel
  phase: PhaseType
  trail: Trail
  message: string
}

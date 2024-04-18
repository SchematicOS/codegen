import type { ReportArgs } from 'core/lib/Reporter.ts'

export class LogStore {
  logs: string[] = []
  operations: Record<string, string[]> = {}

  addLog({ level, phase, trail, message }: ReportArgs) {
    const fullLog = `${level
      .toUpperCase()
      .padEnd(6)} [${phase.toUpperCase()}]  ${trail.toString()} - ${message}`

    this.logs.push(fullLog)

    const { apiPath, method } = trail

    if (apiPath && method) {
      const operationId = `${trail.method?.toUpperCase()} ${trail.apiPath}`

      if (!this.operations[operationId]) {
        this.operations[operationId] = []
      }

      const subMethodPath = `${trail.toSubMethodTrail().toString()}`

      const pathAndMessage = subMethodPath
        ? `${subMethodPath} - ${message}`
        : message

      const subMethodLog = `${level
        .toUpperCase()
        .padEnd(6)} [${phase.toUpperCase()}]  ${pathAndMessage}`

      this.operations[operationId].push(subMethodLog)
    }
  }

  generateOutput() {
    const logs = this.logs.join('\n')
    const operations = Object.entries(this.operations).reduce(
      (acc, [operation, logs]) => {
        acc += `${operation}\n${logs.join('\n')}\n\n`
        return acc
      },
      ''
    )

    return {
      logs,
      operations
    }
  }
}

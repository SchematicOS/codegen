import type { Trail } from 'parse/lib/Trail.ts'
import type { ParseContext } from 'parse/lib/ParseContext.ts'

type OasBaseArgs = {
  trail: Trail
  skipped: Record<string, unknown>
  context: ParseContext
}

export class OasBase {
  trail: Trail
  context: ParseContext

  constructor({ trail, context, skipped }: OasBaseArgs) {
    this.trail = trail
    this.context = context

    this.logSkippedFields(skipped)
  }

  logSkippedFields(skipped: Record<string, unknown>) {
    Object.entries(skipped).forEach(([key, value]) => {
      this.context.report({
        level: 'warn',
        phase: 'parse',
        trail: this.trail.add(key),
        message: `Property not yet implemented. Please request from support if needed - ${JSON.stringify(
          value
        ).slice(0, 20)}`
      })
    })
  }
}

import type { Trail } from '../context/Trail.ts'
import type { CoreContext } from '../context/CoreContext.ts'

type OasBaseArgs = {
  trail: Trail
  skipped: Record<string, unknown>
  context: CoreContext
}

export class OasBase {
  trail: Trail
  context: CoreContext

  constructor({ trail, context, skipped }: OasBaseArgs) {
    this.trail = trail
    this.context = context

    this.logSkippedFields(skipped)
  }

  logSkippedFields(skipped: Record<string, unknown>) {
    Object.entries(skipped).forEach(([key, value]) => {
      this.context.warn({
        trail: this.trail.add(key),
        message: `Property not yet implemented. Please request from support if needed - ${JSON.stringify(
          value
        ).slice(0, 20)}`
      })
    })
  }
}

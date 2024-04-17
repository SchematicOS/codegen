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

    context.notImplemented({ trail, skipped })
  }
}

import type { PhaseType } from './types.ts'

export class CoreContext {
  phase: PhaseType

  private constructor(phase: PhaseType) {
    this.phase = phase
  }

  static create(phase: PhaseType) {
    return new CoreContext(phase)
  }
}

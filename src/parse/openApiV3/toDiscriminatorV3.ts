import type { OpenAPIV3 } from 'openapi-types'
import type { OasDiscriminator } from '@schematicos/types'
import type { ParseContextType } from '../lib/types.ts'

export const toDiscriminatorV3 = (
  discriminator: OpenAPIV3.DiscriminatorObject,
  ctx: ParseContextType
): OasDiscriminator => {
  const { propertyName, ...skipped } = discriminator

  ctx.notImplemented({ section: 'OPENAPI_V3_DISCRIMINATOR', skipped })

  return {
    schematicType: 'discriminator',
    propertyName
  }
}

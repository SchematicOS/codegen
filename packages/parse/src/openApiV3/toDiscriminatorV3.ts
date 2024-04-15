import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import type { OasDiscriminator } from 'npm:@schematicos/types@0.0.34'
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

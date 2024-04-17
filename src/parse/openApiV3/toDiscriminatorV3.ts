import type { OpenAPIV3 } from 'openapi-types'
import type { OasDiscriminator } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'

type ToDiscriminatorV3Args = {
  discriminator: OpenAPIV3.DiscriminatorObject
  trail: Trail
  context: ParseContext
}

export const toDiscriminatorV3 = ({
  discriminator,
  context
}: ToDiscriminatorV3Args): OasDiscriminator => {
  const { propertyName, ...skipped } = discriminator

  context.notImplemented({ section: 'OPENAPI_V3_DISCRIMINATOR', skipped })

  return {
    schematicType: 'discriminator',
    propertyName
  }
}

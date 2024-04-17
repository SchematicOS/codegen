import type { OpenAPIV3 } from 'openapi-types'
import type { OasDiscriminator } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Discriminator } from 'parse/elements/Discriminator.ts'

type ToDiscriminatorV3Args = {
  discriminator: OpenAPIV3.DiscriminatorObject
  trail: Trail
  context: ParseContext
}

export const toDiscriminatorV3 = ({
  discriminator,
  trail,
  context
}: ToDiscriminatorV3Args): OasDiscriminator => {
  const { propertyName, ...skipped } = discriminator

  return Discriminator.create({
    fields: { propertyName },
    trail,
    context,
    skipped
  })
}

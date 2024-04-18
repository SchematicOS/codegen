import type { OpenAPIV3 } from 'openapi-types'
import type { ParseContext } from '../lib/ParseContext.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Discriminator } from 'parse/elements/Discriminator.ts'
import type { DiscriminatorFields } from 'parse/elements/Discriminator.ts'

type ToDiscriminatorV3Args = {
  discriminator: OpenAPIV3.DiscriminatorObject | undefined
  trail: Trail
  context: ParseContext
}

export const toDiscriminatorV3 = ({
  discriminator,
  trail,
  context
}: ToDiscriminatorV3Args): Discriminator | undefined => {
  if (!discriminator) {
    return undefined
  }

  const { propertyName, ...skipped } = discriminator

  const fields: DiscriminatorFields = {
    propertyName
  }

  return Discriminator.create({
    fields,
    trail,
    context,
    skipped
  })
}

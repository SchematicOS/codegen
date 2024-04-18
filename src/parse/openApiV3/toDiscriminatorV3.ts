import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import type { Trail } from 'core/lib/Trail.ts'
import { OasDiscriminator } from 'parse/elements/Discriminator.ts'
import type { DiscriminatorFields } from 'parse/elements/Discriminator.ts'

type ToDiscriminatorV3Args = {
  discriminator: OpenAPIV3.DiscriminatorObject | undefined
  trail: Trail
  context: CoreContext
}

export const toDiscriminatorV3 = ({
  discriminator,
  trail,
  context
}: ToDiscriminatorV3Args): OasDiscriminator | undefined => {
  if (!discriminator) {
    return undefined
  }

  const { propertyName, ...skipped } = discriminator

  const fields: DiscriminatorFields = {
    propertyName
  }

  return OasDiscriminator.create({
    fields,
    trail,
    context,
    skipped
  })
}

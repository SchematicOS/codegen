import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { CoreContext } from '../context/CoreContext.ts'
import { isRef } from '../helpers/isRef.ts'
import type { OpenAPIV3 } from 'openapi-types'
import { match, P } from 'ts-pattern'
import type { Trail } from '../context/Trail.ts'
import { OasUnion } from '../oas-schema/Union.ts'
import { OasObject } from '../oas-schema/Object.ts'
import type { OasObjectFields } from '../oas-schema/Object.ts'
import { OasArray } from '../oas-schema/Array.ts'
import { OasIntersection } from '../oas-schema/Intersection.ts'
import { OasInteger } from '../oas-schema/Integer.ts'
import { OasNumber } from '../oas-schema/Number.ts'
import { OasBoolean } from '../oas-schema/Boolean.ts'
import { OasString } from '../oas-schema/String.ts'
import { OasUnknown } from '../oas-schema/Unknown.ts'
import type { UnknownFields } from '../oas-schema/Unknown.ts'
import type { StringFields } from '../oas-schema/String.ts'
import type { BooleanFields } from '../oas-schema/Boolean.ts'
import type { NumberFields } from '../oas-schema/Number.ts'
import type { IntegerFields } from '../oas-schema/Integer.ts'
import type { ArrayFields } from '../oas-schema/Array.ts'
import type { UnionFields } from '../oas-schema/Union.ts'
import type { IntersectionFields } from '../oas-schema/Intersection.ts'
import type { OasSchema } from '../oas-schema/types.ts'
import type { OasRef } from '../oas-elements/Ref.ts'

type ToSchemasV3Args = {
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
  trail: Trail
  context: CoreContext
}

export const toSchemasV3 = ({
  schemas,
  trail,
  context
}: ToSchemasV3Args): Record<string, OasSchema | OasRef<'schema'>> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => {
      return [
        key,
        toSchemaV3({ schema, trail: trail.addSchemaRef(key), context })
      ]
    })
  )
}

type ToOptionalSchemasV3Args = {
  schemas:
    | Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
    | undefined
  trail: Trail
  context: CoreContext
}

export const toOptionalSchemasV3 = ({
  schemas,
  trail,
  context
}: ToOptionalSchemasV3Args):
  | Record<string, OasSchema | OasRef<'schema'>>
  | undefined => {
  if (!schemas) {
    return undefined
  }

  return toSchemasV3({ schemas, trail, context })
}

type ToSchemaV3Args = {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
  trail: Trail
  context: CoreContext
}

export const toSchemaV3 = ({
  schema,
  trail,
  context
}: ToSchemaV3Args): OasSchema | OasRef<'schema'> => {
  if (isRef(schema)) {
    return toRefV31({ ref: schema, refType: 'schema', trail, context })
  }

  return match(schema)
    .with({ oneOf: P.array() }, matched => {
      const { oneOf, discriminator, title, description, ...skipped } = matched

      const fields: UnionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({
          discriminator,
          trail: trail.add('oneOf').add('discriminator'),
          context
        }),
        members: oneOf.map((item, index) => {
          return toSchemaV3({
            schema: item,
            trail: trail.add('oneOf').add('members').add(`[${index}]`),
            context
          })
        })
      }

      return OasUnion.create({ fields, trail, skipped, context })
    })
    .with({ anyOf: P.array() }, matched => {
      const { anyOf, discriminator, title, description, ...skipped } = matched

      const fields: UnionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({
          discriminator,
          trail: trail.add('oneOf').add('discriminator'),
          context
        }),
        members: anyOf.map((item, index) =>
          toSchemaV3({
            schema: item,
            trail: trail.add('oneOf').add('members').add(`[${index}]`),
            context
          })
        )
      }

      return OasUnion.create({ fields, trail, skipped, context })
    })
    .with({ allOf: P.array() }, matched => {
      const { allOf, discriminator, title, description, ...skipped } = matched

      const fields: IntersectionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({
          discriminator,
          trail: trail.add('allOf').add('discriminator'),
          context
        }),
        members: allOf.map((item, index) =>
          toSchemaV3({
            schema: item,
            trail: trail.add('allOf').add('members').add(`[${index}]`),
            context
          })
        )
      }

      return OasIntersection.create({ fields, trail, skipped, context })
    })
    .with({ type: 'object' }, matched => {
      const {
        type: _type,
        title,
        description,
        properties,
        required,
        additionalProperties,
        ...skipped
      } = matched

      const fields: OasObjectFields = {
        title,
        description,
        properties: toOptionalSchemasV3({
          schemas: properties,
          trail: trail.add('properties'),
          context
        }),
        required,
        additionalProperties: toAdditionalPropertiesV3({
          additionalProperties,
          trail: trail.add('additionalProperties'),
          context
        })
      }

      return OasObject.create({ fields, trail, skipped, context })
    })
    .with({ type: 'array' }, matched => {
      const { type: _type, items, title, description, ...skipped } = matched

      const fields: ArrayFields = {
        title,
        description,
        items: toSchemaV3({
          schema: items,
          trail: trail.add('items'),
          context
        })
      }

      return OasArray.create({ fields, trail, skipped, context })
    })
    .with({ type: 'integer' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: IntegerFields = {
        title,
        description
      }

      return OasInteger.create({ fields, trail, skipped, context })
    })
    .with({ type: 'number' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: NumberFields = {
        title,
        description
      }

      return OasNumber.create({ fields, trail, skipped, context })
    })
    .with({ type: 'boolean' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: BooleanFields = {
        title,
        description
      }

      return OasBoolean.create({ fields, trail, skipped, context })
    })
    .with({ type: 'string' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: StringFields = {
        title,
        description
      }

      return OasString.create({ fields, trail, skipped, context })
    })
    .otherwise(matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: UnknownFields = {
        title,
        description
      }

      return OasUnknown.create({ fields, trail, skipped, context })
    })
}

type ToOptionalSchemaV3Args = {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined
  trail: Trail
  context: CoreContext
}

export const toOptionalSchemaV3 = ({
  schema,
  trail,
  context
}: ToOptionalSchemaV3Args): OasSchema | OasRef<'schema'> | undefined => {
  if (!schema) {
    return undefined
  }

  return toSchemaV3({ schema, trail, context })
}

import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type { OasSchemaData, OasSchemaRefData } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { match, P } from 'ts-pattern'
import type { Trail } from 'parse/lib/Trail.ts'
import { Union } from 'parse/elements/schema/Union.ts'
import { ObjectOas } from 'parse/elements/schema/Object.ts'
import type { ObjectOasFields } from 'parse/elements/schema/Object.ts'
import { ArrayOas } from 'parse/elements/schema/Array.ts'
import { Intersection } from 'parse/elements/schema/Intersection.ts'
import { IntegerOas } from 'parse/elements/schema/Integer.ts'
import { NumberOas } from 'parse/elements/schema/Number.ts'
import { BooleanOas } from 'parse/elements/schema/Boolean.ts'
import { StringOas } from 'parse/elements/schema/String.ts'
import { UnknownOas } from 'parse/elements/schema/Unknown.ts'
import type { UnknownFields } from 'parse/elements/schema/Unknown.ts'
import type { StringFields } from 'parse/elements/schema/String.ts'
import type { BooleanFields } from 'parse/elements/schema/Boolean.ts'
import type { NumberFields } from 'parse/elements/schema/Number.ts'
import type { IntegerFields } from 'parse/elements/schema/Integer.ts'
import type { ArrayFields } from 'parse/elements/schema/Array.ts'
import type { UnionFields } from 'parse/elements/schema/Union.ts'
import type { IntersectionFields } from 'parse/elements/schema/Intersection.ts'

type ToSchemasV3Args = {
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
  trail: Trail
  context: ParseContext
}

export const toSchemasV3 = ({
  schemas,
  trail,
  context
}: ToSchemasV3Args): Record<string, OasSchemaData | OasSchemaRefData> => {
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
  context: ParseContext
}

export const toOptionalSchemasV3 = ({
  schemas,
  trail,
  context
}: ToOptionalSchemasV3Args):
  | Record<string, OasSchemaData | OasSchemaRefData>
  | undefined => {
  if (!schemas) {
    return undefined
  }

  return toSchemasV3({ schemas, trail, context })
}

type ToSchemaV3Args = {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
  trail: Trail
  context: ParseContext
}

export const toSchemaV3 = ({
  schema,
  trail,
  context
}: ToSchemaV3Args): OasSchemaData | OasSchemaRefData => {
  if (isRef(schema)) {
    return toRefV31({ ref: schema, refType: 'schema', trail, context })
  }

  return match(schema)
    .with({ oneOf: P.array() }, matched => {
      const { oneOf, discriminator, title, description, ...skipped } = matched

      const fields: UnionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({ discriminator, trail, context }),
        members: oneOf.map(item => {
          return toSchemaV3({
            schema: item,
            trail: trail.add('members'),
            context
          })
        })
      }

      return Union.create({ fields, trail, skipped, context })
    })
    .with({ anyOf: P.array() }, matched => {
      const { anyOf, discriminator, title, description, ...skipped } = matched

      const fields: UnionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({
          discriminator,
          trail: trail.add('discriminator'),
          context
        }),
        members: anyOf.map(item =>
          toSchemaV3({ schema: item, trail: trail.add('members'), context })
        )
      }

      return Union.create({ fields, trail, skipped, context })
    })
    .with({ allOf: P.array() }, matched => {
      const { allOf, discriminator, title, description, ...skipped } = matched

      const fields: IntersectionFields = {
        title,
        description,
        discriminator: toDiscriminatorV3({
          discriminator,
          trail: trail.add('discriminator'),
          context
        }),
        members: allOf.map(item =>
          toSchemaV3({ schema: item, trail: trail.add('members'), context })
        )
      }

      return Intersection.create({ fields, trail, skipped, context })
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

      const fields: ObjectOasFields = {
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

      return ObjectOas.create({ fields, trail, skipped, context })
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

      return ArrayOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'integer' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: IntegerFields = {
        title,
        description
      }

      return IntegerOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'number' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: NumberFields = {
        title,
        description
      }

      return NumberOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'boolean' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: BooleanFields = {
        title,
        description
      }

      return BooleanOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'string' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: StringFields = {
        title,
        description
      }

      return StringOas.create({ fields, trail, skipped, context })
    })
    .otherwise(matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields: UnknownFields = {
        title,
        description
      }

      return UnknownOas.create({ fields, trail, skipped, context })
    })
}

type ToOptionalSchemaV3Args = {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined
  trail: Trail
  context: ParseContext
}

export const toOptionalSchemaV3 = ({
  schema,
  trail,
  context
}: ToOptionalSchemaV3Args): OasSchemaData | OasSchemaRefData | undefined => {
  if (!schema) {
    return undefined
  }

  return toSchemaV3({ schema, trail, context })
}

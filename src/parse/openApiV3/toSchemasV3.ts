import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type { OasSchema, OasSchemaRef, OasString } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { match, P } from 'ts-pattern'
import type { Trail } from 'parse/lib/Trail.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Union } from 'parse/elements/schema/Union.ts'
import { ObjectOas } from 'parse/elements/schema/Object.ts'
import { ArrayOas } from 'parse/elements/schema/Array.ts'
import { Intersection } from 'parse/elements/schema/Intersection.ts'
import { IntegerOas } from 'parse/elements/schema/Integer.ts'
import { NumberOas } from 'parse/elements/schema/Number.ts'
import { BooleanOas } from 'parse/elements/schema/Boolean.ts'
import { StringOas } from 'parse/elements/schema/String.ts'

type ToSchemasV3Args = {
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
  trail: Trail
  context: ParseContext
}

export const toSchemasV3 = ({
  schemas,
  trail,
  context
}: ToSchemasV3Args): Record<string, OasSchema | OasSchemaRef> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => {
      return [
        key,
        toSchemaV3({ schema, trail: trail.addSchemaRef(key), context })
      ]
    })
  )
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
}: ToSchemaV3Args): OasSchema | OasSchemaRef => {
  if (isRef(schema)) {
    return toRefV31({ ref: schema, refType: 'schema', trail, context })
  }

  return match(schema)
    .with({ oneOf: P.array() }, matched => {
      const { oneOf, discriminator, title, description, ...skipped } = matched

      const fields = stripUndefined({
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3({ discriminator, trail, context })
          : undefined,
        members: oneOf.map(item => {
          return toSchemaV3({
            schema: item,
            trail: trail.add('members'),
            context
          })
        })
      })

      return Union.create({ fields, trail, skipped, context })
    })
    .with({ anyOf: P.array() }, matched => {
      const { anyOf, discriminator, title, description, ...skipped } = matched

      const fields = stripUndefined({
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3({
              discriminator,
              trail: trail.add('discriminator'),
              context
            })
          : undefined,
        members: anyOf.map(item =>
          toSchemaV3({ schema: item, trail: trail.add('members'), context })
        )
      })

      return Union.create({ fields, trail, skipped, context })
    })
    .with({ allOf: P.array() }, matched => {
      const { allOf, discriminator, title, description, ...skipped } = matched

      const fields = stripUndefined({
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3({
              discriminator,
              trail: trail.add('discriminator'),
              context
            })
          : undefined,
        members: allOf.map(item =>
          toSchemaV3({ schema: item, trail: trail.add('members'), context })
        )
      })

      return Intersection.create({ fields, trail, skipped, context })
    })
    .with({ type: 'object' }, matched => {
      const {
        type,
        // discriminator,
        properties,
        required,
        additionalProperties,
        ...skipped
      } = matched

      const fields = stripUndefined({
        type: type,
        properties: properties
          ? toSchemasV3({
              schemas: properties,
              trail: trail.add('properties'),
              context
            })
          : undefined,
        required,
        additionalProperties: toAdditionalPropertiesV3({
          additionalProperties,
          trail: trail.add('additionalProperties'),
          context
        })
      })

      return ObjectOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'array' }, matched => {
      const { type, items, ...skipped } = matched

      const fields = stripUndefined({
        type: type,
        items: toSchemaV3({
          schema: items,
          trail: trail.add('items'),
          context
        })
      })

      return ArrayOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'integer' }, matched => {
      const { type, title, description, ...skipped } = matched

      const fields = stripUndefined({
        type,
        title,
        description
      })

      return IntegerOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'number' }, matched => {
      const { type, title, description, ...skipped } = matched

      const fields = stripUndefined({
        type,
        title,
        description
      })

      return NumberOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'boolean' }, matched => {
      const { type: _type, title, description, ...skipped } = matched

      const fields = stripUndefined({
        title,
        description
      })

      return BooleanOas.create({ fields, trail, skipped, context })
    })
    .with({ type: 'string' }, matched => {
      const {
        type,
        title,
        description,
        pattern,
        format,
        enum: enums,
        ...skipped
      } = matched

      const fields = stripUndefined({
        type,
        title,
        description,
        pattern,
        enums: enums as string[] | undefined,
        format: format as OasString['format']
      })

      return StringOas.create({ fields, trail, skipped, context })
    })
    .otherwise(matched => {
      context.unexpectedValue({
        trail,
        message: `No type schema: ${JSON.stringify(matched, undefined, 2)}`
      })
    }) as OasSchema
}

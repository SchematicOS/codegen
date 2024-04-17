import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { ParseContext } from '../lib/ParseContext.ts'
import { isRef } from '../util/isRef.ts'
import type { OasSchema, OasSchemaRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { match, P } from 'ts-pattern'
import type { Trail } from 'parse/lib/Trail.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { Union } from 'parse/elements/schema/Union.ts'
import { ObjectOas } from 'parse/elements/schema/Object.ts'
import { ArrayOas } from 'parse/elements/schema/Array.ts'
import { Intersection } from 'parse/elements/schema/Intersection.ts'

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
        schematicType: 'schema' as const,
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
        schematicType: 'schema',
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
      const { type, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_INTEGER', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'number' }, matched => {
      const { type, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_NUMBER', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'boolean' }, matched => {
      const { type, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_BOOLEAN', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'string' }, matched => {
      const { type, pattern, format, enum: enums, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_STRING', skipped })

      return {
        schematicType: 'schema',
        type: type,
        pattern,
        enums,
        format
      }
    })
    .otherwise(matched => {
      context.unexpectedValue({
        section: 'OPENAPI_V3_SCHEMA',
        message: `No type schema: ${JSON.stringify(matched, undefined, 2)}`
      })
    }) as OasSchema
}

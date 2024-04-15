import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import type { OasSchema, OasSchemaRef } from 'npm:@schematicos/types@0.0.34'
import type { OpenAPIV3 } from 'npm:openapi-types@12.1.3'
import { match, P } from 'npm:ts-pattern@5.1.1'

export const toSchemasV3 = (
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>,
  ctx: ParseContextType
): Record<string, OasSchema | OasSchemaRef> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([key, value]) => {
      return [key, toSchemaV3(value, ctx)]
    })
  )
}

export const toSchemaV3 = (
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  ctx: ParseContextType
): OasSchema | OasSchemaRef => {
  if (isRef(schema)) {
    return toRefV31(schema, 'schema', ctx)
  }

  return match(schema)
    .with({ oneOf: P.array() }, matched => {
      const { oneOf, discriminator, title, description, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'union',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, ctx)
          : undefined,
        members: oneOf.map(item => toSchemaV3(item, ctx))
      }
    })
    .with({ anyOf: P.array() }, matched => {
      const { anyOf, discriminator, title, description, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'union',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, ctx)
          : undefined,
        members: anyOf.map(item => toSchemaV3(item, ctx))
      }
    })
    .with({ allOf: P.array() }, matched => {
      const { allOf, discriminator, title, description, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'intersection',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, ctx)
          : undefined,
        members: allOf.map(item => toSchemaV3(item, ctx))
      }
    })
    .with({ type: 'object' }, matched => {
      const {
        type,
        discriminator,
        properties,
        required,
        additionalProperties,
        ...skipped
      } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema' as const,
        type: type,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, ctx)
          : undefined,
        properties: properties ? toSchemasV3(properties, ctx) : undefined,
        required,
        additionalProperties: toAdditionalPropertiesV3(
          additionalProperties,
          ctx
        )
      }
    })
    .with({ type: 'array' }, matched => {
      const { type, items, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_ARRAY', skipped })

      return {
        schematicType: 'schema',
        type: type,
        items: toSchemaV3(items, ctx)
      }
    })
    .with({ type: 'integer' }, matched => {
      const { type, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_INTEGER', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'number' }, matched => {
      const { type, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_NUMBER', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'boolean' }, matched => {
      const { type, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_BOOLEAN', skipped })

      return {
        schematicType: 'schema',
        type: type
      }
    })
    .with({ type: 'string' }, matched => {
      const { type, pattern, format, enum: enums, ...skipped } = matched

      ctx.notImplemented({ section: 'OPENAPI_V3_SCHEMA_STRING', skipped })

      return {
        schematicType: 'schema',
        type: type,
        pattern,
        enums,
        format
      }
    })
    .otherwise(matched => {
      ctx.unexpectedValue({
        section: 'OPENAPI_V3_SCHEMA',
        message: `No type schema: ${JSON.stringify(matched, undefined, 2)}`
      })
    }) as OasSchema
}

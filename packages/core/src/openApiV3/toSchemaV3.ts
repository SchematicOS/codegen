import {
  toDiscriminatorV3,
  toAdditionalPropertiesV3,
  toRefV31
} from '@/openApiV3/parseOpenApiV3.ts'
import { ParseContextType } from '@/types.ts'
import { isRef } from '@/util/isRef.ts'
import { OasSchema, OasSchemaRef } from '@schematicos/types'
import { OpenAPIV3 } from 'openapi-types'
import { match } from 'ts-pattern'

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

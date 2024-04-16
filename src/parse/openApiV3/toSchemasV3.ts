import { toRefV31 } from './toRefV31.ts'
import { toDiscriminatorV3 } from './toDiscriminatorV3.ts'
import { toAdditionalPropertiesV3 } from './toAdditionalPropertiesV3.ts'
import type { ParseContextType } from '../lib/types.ts'
import { isRef } from '../util/isRef.ts'
import type { OasSchema, OasSchemaRef } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'
import { match, P } from 'ts-pattern'

type ToSchemasV3Args = {
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
  path: string[]
  context: ParseContextType
}

export const toSchemasV3 = ({
  schemas,
  path,
  context
}: ToSchemasV3Args): Record<string, OasSchema | OasSchemaRef> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => {
      return [key, toSchemaV3({ schema, path: path.concat(key), context })]
    })
  )
}

type ToSchemaV3Args = {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
  path: string[]
  context: ParseContextType
}

export const toSchemaV3 = ({
  schema,
  path,
  context
}: ToSchemaV3Args): OasSchema | OasSchemaRef => {
  if (isRef(schema)) {
    return toRefV31(schema, 'schema', context)
  }

  return match(schema)
    .with({ oneOf: P.array() }, matched => {
      const { oneOf, discriminator, title, description, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'union',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, context)
          : undefined,
        members: oneOf.map(item => {
          return toSchemaV3({
            schema: item,
            path: path.concat('members'),
            context
          })
        })
      }
    })
    .with({ anyOf: P.array() }, matched => {
      const { anyOf, discriminator, title, description, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'union',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, context)
          : undefined,
        members: anyOf.map(item =>
          toSchemaV3({ schema: item, path: path.concat('members'), context })
        )
      }
    })
    .with({ allOf: P.array() }, matched => {
      const { allOf, discriminator, title, description, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema',
        type: 'intersection',
        title,
        description,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, context)
          : undefined,
        members: allOf.map(item =>
          toSchemaV3({ schema: item, path: path.concat('members'), context })
        )
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

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_OBJECT', skipped })

      return {
        schematicType: 'schema' as const,
        type: type,
        discriminator: discriminator
          ? toDiscriminatorV3(discriminator, context)
          : undefined,
        properties: properties
          ? toSchemasV3({
              schemas: properties,
              path: path.concat('properties'),
              context
            })
          : undefined,
        required,
        additionalProperties: toAdditionalPropertiesV3({
          additionalProperties,
          path: path.concat('additionalProperties'),
          context
        })
      }
    })
    .with({ type: 'array' }, matched => {
      const { type, items, ...skipped } = matched

      context.notImplemented({ section: 'OPENAPI_V3_SCHEMA_ARRAY', skipped })

      return {
        schematicType: 'schema',
        type: type,
        items: toSchemaV3({
          schema: items,
          path: path.concat('items'),
          context
        })
      }
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

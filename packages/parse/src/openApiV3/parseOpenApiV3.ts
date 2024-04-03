/* eslint-disable no-restricted-imports */
import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types'
import {
  OasOperation,
  OasPathItem,
  OasRef,
  OasRequestBody,
  OasContent,
  OasMediaTypeItem,
  OasExample,
  OasRoot,
  OasInfo,
  OasComponents,
  OasDiscriminator,
  OasTag,
  OasRequestBodyRef,
  OasExampleRef,
  OasLicense,
  OasContact,
  Method
} from '@schematicos/types'
import { isRef } from '@/util/isRef.ts'
import { toOperationV3 } from '@/openApiV3/toOperationV3.ts'
import { ParseContextType, RefReturn } from '@/types.ts'
import { toResponsesV3 } from '@/openApiV3/toResponseV3.ts'
import { toHeadersV3 } from '@/openApiV3/toHeaderV3.ts'
import { toSchemaV3, toSchemasV3 } from '@/openApiV3/toSchemaV3.ts'
import { toParameterListV3, toParametersV3 } from '@/openApiV3/toParameterV3.ts'

const toRequestBodiesV3 = (
  requestBodies: Record<
    string,
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
  >,
  ctx: ParseContextType
): Record<string, OasRequestBody | OasRequestBodyRef> => {
  return Object.fromEntries(
    Object.entries(requestBodies).map(([key, value]) => {
      return [key, toRequestBodyV3(value, ctx)]
    })
  )
}

const toComponentsV3 = (
  components: OpenAPIV3.ComponentsObject,
  ctx: ParseContextType
): OasComponents => {
  const {
    schemas,
    responses,
    parameters,
    examples,
    requestBodies,
    headers,
    ...skipped
  } = components

  ctx.notImplemented({ section: 'OPENAPI_V3_COMPONENTS', skipped })

  return {
    schematicType: 'components',
    models: schemas ? toSchemasV3(schemas, ctx) : undefined,
    responses: responses ? toResponsesV3(responses, ctx) : undefined,
    parameters: parameters ? toParametersV3(parameters, ctx) : undefined,
    examples: examples
      ? toExamplesV3({ examples, example: undefined, exampleKey: 'TEMP' }, ctx)
      : undefined,
    requestBodies: requestBodies
      ? toRequestBodiesV3(requestBodies, ctx)
      : undefined,
    headers: headers ? toHeadersV3(headers, ctx) : undefined
  }
}

export const toTagsV3 = (
  tags: OpenAPIV3.TagObject[],
  ctx: ParseContextType
): OasTag[] => {
  return tags.map(tag => {
    const { name, description, ...skipped } = tag

    ctx.notImplemented({ section: 'OPENAPI_V3_TAG', skipped })

    return {
      schematicType: 'tag',
      name,
      description
    }
  })
}

const toOperationsV3 = (
  paths: OpenAPIV3.PathsObject,
  ctx: ParseContextType
): OasOperation[] => {
  return Object.entries(paths).flatMap(([path, pathItem]) => {
    if (!pathItem) {
      return []
    }

    const {
      get,
      post,
      put,
      delete: deleteMethod,
      options,
      head,
      patch,
      trace,
      ...rest
    } = pathItem

    const pathItemObject = toPathItem(rest, ctx)

    const methodObjects = {
      get,
      post,
      put,
      delete: deleteMethod,
      options,
      head,
      patch,
      trace
    }

    return Object.entries(methodObjects)
      .map(([method, operation]) => {
        if (!operation) {
          return
        }

        return toOperationV3(
          operation,
          {
            method: method as Method,
            path,
            pathItem: pathItemObject
          },
          ctx
        )
      })
      .filter((item): item is OasOperation => Boolean(item))
  })
}

const toPathItem = (
  pathItem: OpenAPIV3.PathItemObject,
  ctx: ParseContextType
): OasPathItem => {
  const { $ref, summary, description, parameters, ...skipped } = pathItem

  ctx.notImplemented({ section: 'OPENAPI_V3_PATH_ITEM', skipped })

  return {
    schematicType: 'pathItem',
    $ref,
    summary,
    description,
    parameters: parameters ? toParameterListV3(parameters, ctx) : undefined
  }
}

type ToExamplesV3Args = {
  example: OpenAPIV3.ExampleObject | undefined
  examples:
    | Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>
    | undefined
  exampleKey: string
}

export const toExampleSimpleV3 = (example: any): OasExample | OasExampleRef => {
  return {
    schematicType: 'example',
    value: example
  }
}

export const toExampleV3 = (
  examples: OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject,
  ctx: ParseContextType
): OasExample | OasExampleRef => {
  if (isRef(examples)) {
    return toRefV31(examples, 'example', ctx)
  }

  const { summary, description, value, ...skipped } = examples

  ctx.notImplemented({ section: 'OPENAPI_V3_EXAMPLE', skipped })

  return {
    schematicType: 'example',
    summary,
    description,
    value
  }
}

export const toExamplesV3 = (
  { example, examples, exampleKey }: ToExamplesV3Args,
  ctx: ParseContextType
): Record<string, OasExample | OasExampleRef> | undefined => {
  if (example && examples) {
    ctx.unexpectedValue({
      section: 'OPENAPI_V3_EXAMPLES',
      message: `Both example and examples are defined for ${exampleKey}`
    })
  }

  if (example) {
    return {
      [exampleKey]: toExampleSimpleV3(example)
    }
  }

  if (examples) {
    return Object.fromEntries(
      Object.entries(examples).map(([key, value]) => {
        return [key, toExampleV3(value, ctx)]
      })
    )
  }

  return undefined
}

export const toMediaTypeItemV3 = (
  mediaTypeItem: OpenAPIV3.MediaTypeObject,
  mediaType: string,
  ctx: ParseContextType
): OasMediaTypeItem => {
  const { schema, example, examples, ...skipped } = mediaTypeItem

  ctx.notImplemented({ section: 'OPENAPI_V3_MEDIA_TYPE_ITEM', skipped })

  return {
    schematicType: 'mediaType',
    mediaType: mediaType,
    schema: schema ? toSchemaV3(schema, ctx) : undefined,
    examples: toExamplesV3({ example, examples, exampleKey: mediaType }, ctx)
  }
}

export const toContentV3 = (
  content: Record<string, OpenAPIV3.MediaTypeObject>,
  ctx: ParseContextType
): OasContent => {
  return Object.fromEntries(
    Object.entries(content).map(([mediaType, value]) => {
      return [mediaType, toMediaTypeItemV3(value, mediaType, ctx)]
    })
  )
}

export const toRequestBodyV3 = (
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ctx: ParseContextType
): OasRequestBody | OasRequestBodyRef => {
  if (isRef(requestBody)) {
    return toRefV31(requestBody, 'requestBody', ctx)
  }

  const { description, content, required, ...skipped } = requestBody

  ctx.notImplemented({ section: 'OPENAPI_V3_REQUEST_BODY', skipped })

  return {
    schematicType: 'requestBody',
    description,
    content: toContentV3(content, ctx),
    required
  }
}

export const toRefV31 = <T extends OasRef['refType']>(
  ref: OpenAPIV3_1.ReferenceObject,
  refType: T,
  ctx: ParseContextType
): RefReturn<T> => {
  const { $ref, summary, description, ...skipped } = ref

  ctx.notImplemented({ section: 'OPENAPI_V3_REF', skipped })

  return {
    schematicType: 'ref',
    refType,
    $ref,
    summary,
    description
  } as RefReturn<T>
}

export const toDiscriminatorV3 = (
  discriminator: OpenAPIV3.DiscriminatorObject,
  ctx: ParseContextType
): OasDiscriminator => {
  const { propertyName, mapping, ...skipped } = discriminator

  ctx.notImplemented({ section: 'OPENAPI_V3_DISCRIMINATOR', skipped })

  return {
    schematicType: 'discriminator',
    propertyName,
    mapping
  }
}

export const toAdditionalPropertiesV3 = (
  additionalProperties:
    | boolean
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.SchemaObject
    | undefined,
  ctx: ParseContextType
) => {
  if (typeof additionalProperties === 'boolean') {
    return additionalProperties
  }

  if (additionalProperties === undefined) {
    return undefined
  }

  const parsed = toSchemaV3(additionalProperties, ctx)

  return parsed
}

const fromInfoV3 = (
  info: OpenAPIV3.InfoObject,
  ctx: ParseContextType
): OasInfo => {
  const {
    title,
    description,
    termsOfService,
    contact,
    license,
    version,
    ...skipped
  } = info

  ctx.notImplemented({ section: 'OPENAPI_V3_INFO', skipped })

  return {
    schematicType: 'info',
    title,
    description,
    termsOfService,
    contact: contact ? toContact(contact) : undefined,
    license: license ? toLicense(license) : undefined,
    version
  }
}

const toLicense = (license: OpenAPIV3.LicenseObject): OasLicense => ({
  schematicType: 'license',
  identifier: undefined,
  ...license
})

const toContact = (contact: OpenAPIV3.ContactObject): OasContact => ({
  schematicType: 'contact',
  ...contact
})

export const fromDocumentV3 = (
  document: OpenAPIV3.Document,
  ctx: ParseContextType
): OasRoot => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  ctx.notImplemented({ section: 'OPENAPI_V3_DOCUMENT', skipped })

  return {
    schematicType: 'openapi',
    openapi,
    info: fromInfoV3(info, ctx),
    operations: toOperationsV3(paths, ctx),
    components: components ? toComponentsV3(components, ctx) : undefined,
    tags: tags ? toTagsV3(tags, ctx) : undefined
  }
}

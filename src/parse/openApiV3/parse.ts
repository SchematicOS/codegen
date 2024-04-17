import type { OpenAPIV3 } from 'openapi-types'
import type { OasDocumentData } from '@schematicos/types'
import type { ParseContext } from '../lib/ParseContext.ts'
import { toTagsV3 } from './toTagsV3.ts'
import { toOperationsV3 } from './toOperationsV3.ts'
import { toComponentsV3 } from './components/toComponentsV3.ts'
import type { Trail } from 'parse/lib/Trail.ts'
import { Document } from 'parse/elements/Document.ts'
import { stripUndefined } from 'parse/util/stripUndefined.ts'
import { toInfoV3 } from 'parse/openApiV3/toInfoV3.ts'

type ToDocumentV3Args = {
  document: OpenAPIV3.Document
  trail: Trail
  context: ParseContext
}

export const toDocumentV3 = ({
  document,
  trail,
  context
}: ToDocumentV3Args): Document => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  const fields = stripUndefined({
    openapi,
    info: toInfoV3({ info, trail: trail.add('info'), context }),
    operations: toOperationsV3({
      paths,
      trail: trail.add('paths'),
      context
    }),
    components: components
      ? toComponentsV3({
          components,
          trail: trail.add('components'),
          context
        })
      : undefined,
    tags: tags
      ? toTagsV3({ tags, trail: trail.add('tags'), context })
      : undefined
  })

  return Document.create({ fields, trail, context, skipped })
}

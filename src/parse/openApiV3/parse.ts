import type { OpenAPIV3 } from 'openapi-types'
import type { CoreContext } from 'core/lib/CoreContext.ts'
import { toTagsV3 } from './toTagsV3.ts'
import { toOperationsV3 } from './toOperationsV3.ts'
import { toComponentsV3 } from './components/toComponentsV3.ts'
import type { Trail } from 'core/lib/Trail.ts'
import { OasDocument } from 'parse/elements/Document.ts'
import { toInfoV3 } from 'parse/openApiV3/toInfoV3.ts'
import type { DocumentFields } from 'parse/elements/Document.ts'

type ToDocumentV3Args = {
  document: OpenAPIV3.Document
  trail: Trail
  context: CoreContext
}

export const toDocumentV3 = ({
  document,
  trail,
  context
}: ToDocumentV3Args): OasDocument => {
  const { openapi, info, paths, components, tags, ...skipped } = document

  const fields: DocumentFields = {
    openapi,
    info: toInfoV3({ info, trail: trail.add('info'), context }),
    operations: toOperationsV3({
      paths,
      trail: trail.add('paths'),
      context
    }),
    components: toComponentsV3({
      components,
      trail: trail.add('components'),
      context
    }),
    tags: toTagsV3({ tags, trail: trail.add('tags'), context })
  }

  return OasDocument.create({ fields, trail, context, skipped })
}

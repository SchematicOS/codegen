import type { Stringable } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'

type ConstructorArgs = {
  path?: string[]
  apiPath?: string
  method?: string
  schemaRef?: string
  document?: OpenAPIV3.Document
}

export class Trail implements Stringable {
  path: string[]
  apiPath: string | undefined
  method: string | undefined
  schemaRef: string | undefined
  document: OpenAPIV3.Document | undefined

  private constructor({
    path = [],
    apiPath,
    method,
    schemaRef,
    document
  }: ConstructorArgs) {
    this.path = Array.isArray(path) ? path : [path]
    this.apiPath = apiPath
    this.method = method
    this.schemaRef = schemaRef
    this.document = document
  }

  static create({
    path,
    apiPath,
    method,
    schemaRef,
    document
  }: ConstructorArgs = {}) {
    return new Trail({ path, apiPath, method, schemaRef, document })
  }

  add(path: string) {
    return Trail.create({
      path: this.path.concat(path),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef: this.schemaRef,
      document: this.document
    })
  }

  addApiPath(apiPath: string) {
    return Trail.create({
      path: this.path.concat(`[${apiPath}]`),
      apiPath,
      method: this.method,
      schemaRef: this.schemaRef,
      document: this.document
    })
  }

  addMethod(method: string) {
    return Trail.create({
      path: this.path.concat(method),
      apiPath: this.apiPath,
      method,
      schemaRef: this.schemaRef,
      document: this.document
    })
  }

  addSchemaRef(schemaRef: string) {
    return Trail.create({
      path: this.path.concat(schemaRef),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef,
      document: this.document
    })
  }

  toString() {
    return this.path.reduce((acc, path) => {
      if (!acc) {
        return path
      }

      return path.startsWith('[') ? `${acc}${path}` : `${acc}.${path}`
    }, '')
  }
}

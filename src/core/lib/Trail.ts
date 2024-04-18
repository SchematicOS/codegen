import type { Stringable } from '@schematicos/types'
import type { OpenAPIV3 } from 'openapi-types'

type ConstructorArgs = {
  path?: string[]
  apiPath?: string
  method?: string
  schemaRef?: string
  document?: OpenAPIV3.Document
  subMethodIndex?: number
}

export class Trail implements Stringable {
  path: string[]
  apiPath: string | undefined
  method: string | undefined
  schemaRef: string | undefined
  document: OpenAPIV3.Document | undefined
  subMethodIndex?: number

  private constructor({
    path = [],
    apiPath,
    method,
    schemaRef,
    document,
    subMethodIndex
  }: ConstructorArgs) {
    this.path = Array.isArray(path) ? path : [path]
    this.apiPath = apiPath
    this.method = method
    this.schemaRef = schemaRef
    this.document = document
    this.subMethodIndex = subMethodIndex
  }

  static create({
    path,
    apiPath,
    method,
    schemaRef,
    document,
    subMethodIndex
  }: ConstructorArgs = {}) {
    return new Trail({
      path,
      apiPath,
      method,
      schemaRef,
      document,
      subMethodIndex
    })
  }

  add(path: string) {
    return Trail.create({
      path: this.path.concat(path),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef: this.schemaRef,
      document: this.document,
      subMethodIndex: this.subMethodIndex
    })
  }

  addApiPath(apiPath: string) {
    return Trail.create({
      path: this.path.concat(`[${apiPath}]`),
      apiPath,
      method: this.method,
      schemaRef: this.schemaRef,
      document: this.document,
      subMethodIndex: this.subMethodIndex
    })
  }

  addMethod(method: string) {
    return Trail.create({
      path: this.path.concat(method),
      apiPath: this.apiPath,
      method,
      schemaRef: this.schemaRef,
      document: this.document,
      subMethodIndex: this.path.length + 1
    })
  }

  addSchemaRef(schemaRef: string) {
    return Trail.create({
      path: this.path.concat(schemaRef),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef,
      document: this.document,
      subMethodIndex: this.subMethodIndex
    })
  }

  toSubMethodTrail() {
    return Trail.create({
      path: this.path.slice(this.subMethodIndex),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef: this.schemaRef,
      document: this.document,
      subMethodIndex: 0
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

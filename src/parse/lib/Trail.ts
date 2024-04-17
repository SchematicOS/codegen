type ConstructorArgs = {
  path?: string[]
  apiPath?: string
  method?: string
  schemaRef?: string
}

export class Trail {
  path: string[]
  apiPath?: string
  method?: string
  schemaRef?: string

  private constructor({
    path = [],
    apiPath,
    method,
    schemaRef
  }: ConstructorArgs) {
    this.path = Array.isArray(path) ? path : [path]
    this.apiPath = apiPath
    this.method = method
    this.schemaRef = schemaRef
  }

  static create({ path, apiPath, method, schemaRef }: ConstructorArgs = {}) {
    return new Trail({ path, apiPath, method, schemaRef })
  }

  add(path: string) {
    return Trail.create({
      path: this.path.concat(path),
      apiPath: this.apiPath,
      method: this.method,
      schemaRef: this.schemaRef
    })
  }

  addApiPath(apiPath: string) {
    return Trail.create({
      path: this.path.concat(apiPath),
      apiPath,
      method: this.method,
      schemaRef: this.schemaRef
    })
  }

  addMethod(method: string) {
    return Trail.create({
      path: this.path.concat(method),
      apiPath: this.apiPath,
      method,
      schemaRef: this.schemaRef
    })
  }

  addSchemaRef(schemaRef: string) {
    return Trail.create({
      path: [...this.path],
      apiPath: this.apiPath,
      method: this.method,
      schemaRef
    })
  }
}

type Ref = {
  $ref: string
}

export const isRef = (value: unknown): value is Ref => {
  if (
    value &&
    typeof value === 'object' &&
    '$ref' in value &&
    typeof value.$ref === 'string'
  ) {
    return true
  } else {
    return false
  }
}

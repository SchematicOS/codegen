import { SchematicBase } from 'generate/elements/SchematicBase.ts'
import type { GenerateContext } from 'generate/lib/GenerateContext.ts'
import type { OasSchemaRef, OasSchema, Stringable } from '@schematicos/types'
import { isRef } from 'generate/helpers/ref.ts'

type ZodIntersectionArgs = {
  context: GenerateContext
  destinationPath: string
  members: (OasSchema | OasSchemaRef)[]
}

export class ZodIntersection extends SchematicBase implements Stringable {
  members: (OasSchema | OasSchemaRef)[]
  allObjects: boolean

  private constructor({
    context,
    destinationPath,
    members
  }: ZodIntersectionArgs) {
    super({ context })

    this.members = members

    this.allObjects = members.every(member => {
      if (isRef(member)) {
        const resolved = context.resolveRef(member)
        return resolved.type === 'object'
      } else {
        return member.type === 'object'
      }
    })

    this.children = toChildren({ context, destinationPath, members })
  }

  static create(args: ZodIntersectionArgs) {
    return new ZodIntersection(args)
  }

  toString() {
    const [first, ...rest] = this.children

    const firstString = first.toString()

    if (this.allObjects) {
      return rest.reduce<string>((acc, child) => {
        return `${acc}.merge(${child})`
      }, firstString)
    } else {
      return rest.reduce<string>((acc, child) => {
        return `${acc}.and(${child})`
      }, firstString)
    }
  }
}

type ToChildrenArgs = {
  context: GenerateContext
  destinationPath: string
  members: (OasSchema | OasSchemaRef)[]
}

const toChildren = ({
  context,
  destinationPath,
  members
}: ToChildrenArgs): Stringable[] => {
  return members.map(value =>
    context.toTypeSystem({ destinationPath, value, required: true })
  )
}

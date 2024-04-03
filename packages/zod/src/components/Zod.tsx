import { ZodArray } from '@/components/ZodArray.tsx'
import { ZodObject } from '@/components/ZodObject.tsx'
import { ZodRef } from '@/components/ZodRef.tsx'
import { ZodString } from '@/components/ZodString.tsx'
import { ReactNode } from 'react'
import { match } from 'ts-pattern'
import { $, Value, useRegisterImports } from '@schematicos/generate'
import { OasSchemaRef, OasSchema, OasVoid } from '@schematicos/types'

export type ValueProps = {
  value: OasSchema | OasVoid | OasSchemaRef
  required: boolean
}

// User land
export const Zod = ({ value, required }: ValueProps) => {
  useRegisterImports({
    zod: ['z']
  })

  return (
    <WithDescription description={value.description}>
      <Optional required={required}>
        {match(value)
          .with({ schematicType: 'ref' }, matched => <ZodRef value={matched} />)
          .with({ type: 'array' }, matched => (
            <ZodArray value={matched}>
              <Value key="key" value={matched.items} required />
            </ZodArray>
          ))
          .with({ type: 'object' }, matched => <ZodObject value={matched} />)
          // .with({ valueType: 'union' }, ({ members, discriminator }) =>
          //   ZodUnion.fromValue({ members, discriminator })
          // )
          // .with({ valueType: 'intersection' }, ({ members, discriminator }) =>
          //   ZodIntersection.fromValue({ members, discriminator })
          // )
          .with({ type: 'number' }, () => `z.number()`)
          .with({ type: 'integer' }, () => `z.number().int()`)
          .with({ type: 'boolean' }, () => `z.boolean()`)
          .with({ type: 'string' }, matched => <ZodString value={matched} />)
          .with({ type: 'void' }, () => `z.void()`)
          .with({ type: 'null' }, () => `z.null()`)
          .otherwise(matched => {
            console.log(`Unhandled value type: ${matched}`)

            return `z.unknown()`
          })}
      </Optional>
    </WithDescription>
  )
}

type OptionalProps = {
  children: ReactNode
  required?: boolean
}

const Optional = ({ children, required = false }: OptionalProps) => {
  return required ? children : $`${children}.optional()`
}

type WithDescriptionProps = {
  description?: string
  children: ReactNode
}

const WithDescription = ({ description, children }: WithDescriptionProps) => {
  return description ? $`/** ${description} */\n${children}` : children
}

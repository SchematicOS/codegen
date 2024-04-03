import { elements } from '@/lib/elements.ts'
import { TypeSystemProps } from '@schematicos/types'
import { useTransformer } from '@/lib/useTransformer.tsx'

const { Value: ValueTag } = elements

export type ValueProps = TypeSystemProps

export const Value = ({ value, required }: ValueProps) => {
  const { typeSystem } = useTransformer()
  const { component: Component } = typeSystem

  return (
    <ValueTag>
      <Component value={value} required={required} />
    </ValueTag>
  )
}

import { GenerateContext } from '@/lib/GenerateContext.ts'
import { GenerateProvider } from '@/lib/GenerateProvider.tsx'
import { ReactNode } from 'react'

type GenerateProps = {
  ctx: GenerateContext
  children: ReactNode
}

export const Generate = ({ ctx, children }: GenerateProps) => {
  return <GenerateProvider ctx={ctx}>{children}</GenerateProvider>
}

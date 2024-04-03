import { SchematicReact } from '@/SchematicReact.ts'
import { Container } from '@/elements/Container.ts'
import { GenerateContext } from '@/lib/GenerateContext.ts'
import { ReactNode } from 'react'

export const schematicRender = (element: ReactNode, ctx: GenerateContext) => {
  const renderPromise = new Promise<Record<string, string>>(
    (resolve, reject) => {
      const container = new Container(ctx)

      SchematicReact.render(element, container, () => {
        try {
          resolve(container.render())
        } catch (e) {
          reject(e)
        }
      })
    }
  )

  return renderPromise
}

import { ElementsPropsMap } from '@schematicos/generate'

declare global {
  module JSX {
    interface IntrinsicElements extends ElementsPropsMap {
    
    }
  }
}

export {}

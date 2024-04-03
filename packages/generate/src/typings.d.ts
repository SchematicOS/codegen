import { ElementsPropsMap } from '@/lib/elements.ts'
declare global {
  module JSX {
    interface IntrinsicElements extends ElementsPropsMap {
    
    }
  }
}

export {}

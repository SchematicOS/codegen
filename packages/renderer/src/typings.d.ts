import { ElementsPropsMap } from '@/elements/createInstance'
declare global {
  module JSX {
    interface IntrinsicElements extends ElementsPropsMap {
    
    }
  }
}

export {}

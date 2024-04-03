import { elements } from '@/lib/elements.ts'
import { Stringable } from '@schematicos/types'
import { Fragment, ReactNode, isValidElement } from 'react'

const { List } = elements

type To$Args = {
  separator?: string
}

export const to$ =
  ({ separator }: To$Args = {}) =>
  (strings: TemplateStringsArray, ...things: (Stringable | ReactNode)[]) => {
    const out = strings
      .flatMap((item, index) => {
        if (index === strings.length - 1) {
          return [item]
        } else {
          return [item, things[index]]
        }
      })
      .map((item, index) => toReact({ item, separator, index }))

    return <List>{out}</List>
  }

export const $ = to$()

type ToReactArgs = {
  item: Stringable | ReactNode
  separator: string | undefined
  index: number
}

export const toReact = ({ item, index, separator }: ToReactArgs): ReactNode => {
  if (isReactArray(item)) {
    if (typeof separator === 'undefined') {
      return item
    } else {
      return intersperse(item, separator)
    }
  }

  if (isReactElement(item)) {
    return item
  }

  return <Fragment key={index}>{`${item}`}</Fragment>
}

export const isReactElement = (item: unknown): item is ReactNode => {
  return isValidElement(item)
}

export const isReactArray = (item: unknown): item is ReactNode[] => {
  return Array.isArray(item) && item.every(isReactElement)
}

const intersperse = (items: ReactNode[], separator: ReactNode) => {
  return items.flatMap((item, index) => {
    return index === items.length - 1 ? [item] : [item, separator]
  })
}

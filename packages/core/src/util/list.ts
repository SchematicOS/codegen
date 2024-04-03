export const list = (...items: string[]) => {
  return items.filter(Boolean).join(',\n')
}

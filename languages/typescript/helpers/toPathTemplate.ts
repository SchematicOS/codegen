export const toPathTemplate = (path: string, queryArg?: string) => {
  return `\`${path.replaceAll(
    /{([^}]*)}/g,
    queryArg ? '${' + queryArg + '.$1}' : '${$1}'
  )}\``
}

export const toPathTemplate = (path: string, queryArg?: string) => {
  console.log('path', path)

  return `\`${path.replaceAll(
    /{([^}]*)}/g,
    queryArg ? '${' + queryArg + '.$1}' : '${$1}'
  )}\``
}

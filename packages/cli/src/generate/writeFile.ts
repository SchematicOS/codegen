import fs from 'fs'
import * as prettier from 'prettier'

type WriteFileArgs = {
  output: string
  resolvedPath: string
  parser?: 'typescript' | 'json'
}

export const writeFile = async ({
  output,
  resolvedPath,
  parser = 'typescript'
}: WriteFileArgs) => {
  try {
    const formatted = await prettier.format(output, {
      ...prettierConfig,
      parser
    })

    const dir = resolvedPath.substring(0, resolvedPath.lastIndexOf('/'))

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(resolvedPath, formatted)
  } catch (error) {
    console.error(error)
  }
}

const prettierConfig: prettier.Options = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid'
}

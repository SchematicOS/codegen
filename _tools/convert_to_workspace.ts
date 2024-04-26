// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { discoverExportsByPackage, discoverPackages } from './packages.ts'
import { walk } from '@std/fs'
import { dirname, fromFileUrl, join, relative, toFileUrl } from '@std/path'
import { VERSION } from '../version.ts'

const cwd = await Deno.realPath('.')

// await Deno.remove('./version.ts')

// let fileServer = await Deno.readTextFile('http/file_server.ts')
// fileServer = fileServer.replace(
//   `import { VERSION } from "../version.ts";`,
//   `import denoConfig from "./deno.json" with { type: "json" };`
// )
// fileServer = fileServer.replaceAll('${VERSION}', '${denoConfig.version}')
// fileServer = fileServer.replace(
//   'https://deno.land/std/http/file_server.ts',
//   'jsr:@std/http@${denoConfig.version}/file_server'
// )
// await Deno.writeTextFile('http/file_server.ts', fileServer)

// let fileServerTest = await Deno.readTextFile('http/file_server_test.ts')
// fileServerTest = fileServerTest.replace(
//   `import { VERSION } from "../version.ts";`,
//   `import denoConfig from "./deno.json" with { type: "json" };`
// )
// fileServerTest = fileServerTest.replaceAll(
//   '${VERSION}',
//   '${denoConfig.version}'
// )
// await Deno.writeTextFile('http/file_server_test.ts', fileServerTest)

const packages = await discoverPackages()
const exportsByPackage = await discoverExportsByPackage(packages)

const allExports: string[] = []
for (const [pkg, exports] of exportsByPackage.entries()) {
  for (const [_, path] of exports) {
    allExports.push(join(pkg, path))
  }
}

// can't use a data url here because it's too long and won't work on windows
const tempFileText = allExports
  .map(path => `import "${toFileUrl(Deno.realPathSync(path))}";`)
  .join('')
const tempFilePath = 'temp_graph.ts'
Deno.writeTextFileSync(tempFilePath, tempFileText)
const out = await new Deno.Command(Deno.execPath(), {
  args: ['info', '--json', '--config', 'deno.json', tempFilePath]
}).output()
Deno.removeSync(tempFilePath)
const graph = JSON.parse(new TextDecoder().decode(out.stdout))

const pkgDeps = new Map<string, Set<string>>(
  packages.map(pkg => [pkg, new Set()])
)

for (const { specifier, dependencies } of graph.modules) {
  if (!specifier.startsWith('file://') || specifier.endsWith('temp_graph.ts')) {
    continue
  }

  const from = relative(cwd, fromFileUrl(specifier)).replaceAll('\\', '/')
  const fromPkg = from.split('/')[0]!
  for (const dep of dependencies ?? []) {
    if (dep.code) {
      if (
        !dep.code.specifier.startsWith('file://') ||
        dep.code.specifier.endsWith('temp_graph.ts')
      ) {
        continue
      }

      const to = relative(cwd, fromFileUrl(dep.code.specifier)).replaceAll(
        '\\',
        '/'
      )
      const toPkg = to.split('/')[0]!
      if (fromPkg !== toPkg) {
        pkgDeps.get(fromPkg)!.add(toPkg)
      }
    }
    if (dep.types) {
      const to = relative(cwd, fromFileUrl(dep.types.specifier)).replaceAll(
        '\\',
        '/'
      )
      const toPkg = to.split('/')[0]!
      if (fromPkg !== toPkg) {
        pkgDeps.get(fromPkg)!.add(toPkg)
      }
    }
  }
}

const orderedPackages: string[] = []
const seen = new Set<string>()

function visit(pkg: string) {
  if (seen.has(pkg)) return
  seen.add(pkg)

  const d = pkgDeps.get(pkg)

  if (d) {
    for (const dep of d) {
      visit(dep)
    }
  }

  orderedPackages.push(pkg)
}

for (const pkg of packages) {
  visit(pkg)
}

// Now walk through all files, and replace relative imports between packages
// with absolute jsr imports like so:
// ```
// // cli/parse_args.ts
// import { assert } from "../assert/assert.ts";
// import * as path from "../path/mod.ts";
// ```
// becomes
// ```
// // cli/parse_args.ts
// import { assert } from "@std/assert/assert";
// import * as path from "@std/path";
// ```
// Also replace all absolute https://deno.land/std@$STD_VERSION/ imports with absolute jsr
// imports.
for await (const entry of walk(cwd)) {
  if (!entry.isFile) continue
  if (entry.path.includes('/_tools')) continue // ignore tools
  if (entry.path.includes('/testdata/')) continue // ignore testdata

  if (!entry.path.endsWith('.md') && !entry.path.endsWith('.ts')) continue
  const text = await Deno.readTextFile(entry.path)
  const currentUrl = toFileUrl(entry.path)
  const currentPkg = relative(cwd, entry.path)
    .replaceAll('\\', '/')
    .split('/')[0]

  // Find all relative imports.
  const relativeImportRegex = /from\s+["']\.?\.\/([^"']+)["']/g
  const relativeImports = []
  for (const match of text.matchAll(relativeImportRegex)) {
    relativeImports.push('../' + match[1])
  }

  // Find all absolute imports.
  const absoluteImportRegex =
    /https:\/\/deno\.land\/std@\$STD_VERSION\/([^"'\s]+)/g
  const absoluteImports = []
  for (const match of text.matchAll(absoluteImportRegex)) {
    absoluteImports.push('https://deno.land/std@$STD_VERSION/' + match[1])
  }

  const replacedImports: [string, string][] = []

  for (const specifier of relativeImports) {
    const targetUrl = new URL(specifier, currentUrl)
    const path = fromFileUrl(targetUrl)
    const target = relative(cwd, path).replaceAll('\\', '/')
    const pkg = target.split('/')[0]
    if (pkg === currentPkg) {
      let newSpecifier = relative(dirname(entry.path), target).replaceAll(
        '\\',
        '/'
      )
      if (!newSpecifier.startsWith('.')) {
        newSpecifier = './' + newSpecifier
      }
      replacedImports.push([specifier, newSpecifier])
    } else {
      const newSpecifier =
        '@std/' +
        fixPackagePath(target)
          .replace(/(\.d)?\.ts$/, '')
          .replace(/\/mod$/, '')
      replacedImports.push([specifier, newSpecifier])
    }
  }

  for (const specifier of absoluteImports) {
    const target = specifier.replace(
      /^https:\/\/deno\.land\/std@\$STD_VERSION\//,
      ''
    )
    const newSpecifier =
      '@std/' +
      fixPackagePath(target)
        .replace(/(\.d)?\.ts$/, '')
        .replace(/\/mod$/, '')
    replacedImports.push([specifier, newSpecifier])
  }

  // Replace all imports.
  let newText = text
  for (const [oldSpecifier, newSpecifier] of replacedImports) {
    newText = newText.replace(oldSpecifier, newSpecifier)
  }

  // Write the file back.
  await Deno.writeTextFile(entry.path, newText)
}

// Generate `$package/deno.json` files.
for (const pkg of packages) {
  const exportsList = exportsByPackage.get(pkg)!
  let exports
  if (exportsList.length === 1 && exportsList[0]![0] === '.') {
    exports = './mod.ts'
  } else {
    exports = Object.fromEntries(exportsList)
  }
  const denoJson = {
    name: `@std/${fixPackageName(pkg)}`,
    version: VERSION,
    exports
  }
  /** @see {@link https://github.com/denoland/deno/issues/22317} */
  if (pkg === 'crypto') {
    // @ts-ignore Trust me
    denoJson.exclude = ['_wasm/target']
  }
  await Deno.writeTextFile(
    join(pkg, 'deno.json'),
    JSON.stringify(denoJson, null, 2) + '\n'
  )
}

function fixPackageName(pkg: string) {
  return pkg.replaceAll('_', '-')
}

function fixPackagePath(path: string) {
  const packageName = /^[^/]+/.exec(path)
  if (packageName) {
    return path
      .replace(packageName[0], fixPackageName(packageName[0]))
      .replaceAll('_', '-')
  }
  return path.replaceAll('_', '-')
}

// Generate `deno.json` file.
const denoJson = JSON.parse(await Deno.readTextFile('deno.json'))
denoJson.workspaces = orderedPackages.map(pkg => `./${pkg}`)
await Deno.writeTextFile('deno.json', JSON.stringify(denoJson, null, 2) + '\n')

module.exports = {
  extends: "@schematicos/eslint-config",
  ignorePatterns:['node_modules/*', '.eslintrc.cjs', 'bin/*'],
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname
  }
}

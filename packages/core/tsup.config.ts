import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.ts', 'src/openApi/v2/index.ts', 'src/openApi/v3/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: false,
  dts: true,
  format: ['esm']
})

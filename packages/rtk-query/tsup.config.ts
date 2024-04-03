import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: false,
  dts: true,
  format: ['esm']
})

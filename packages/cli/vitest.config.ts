import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      generate: '/src/generate',
      lib: '/src/lib',
      setup: '/src/setup',
      util: '/src/util',
      zod: '/src/zod'
    }
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}']
  }
})

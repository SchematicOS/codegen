import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@/zod': '/src/zod',
      '@/data': '/src/data',
      '@/openApi': '/src/openApi',
      '@/rtkQuery': '/src/rtkQuery',
      '@/util': '/src/util',
      '@/generate': '/src/generate',
      '@/lib': '/src/lib',
      '@/setup': '/src/setup'
    }
  }
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // or 'happy-dom' if you want browser-like tests
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})

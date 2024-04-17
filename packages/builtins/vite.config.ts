import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

export default defineConfig((): UserConfig => {
  return {
    define: {
      __DEV__: process.env.NODE_ENV !== 'production'
    },
    build: {
      lib: {
        entry: join(process.cwd(), 'src/index.ts'),
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: ['fx-flow']
      },
      sourcemap: true,
      minify: true
    },
    plugins: [
      dts({
        exclude: 'vite.config.ts'
      }),
      eslint()
    ]
  }
})

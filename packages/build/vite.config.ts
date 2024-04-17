import { builtinModules } from 'module'
import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

export default defineConfig((): UserConfig => {
  return {
    build: {
      lib: {
        entry: join(process.cwd(), 'src/index.ts'),
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: [
          ...builtinModules,
          ...builtinModules.map((x) => `node:${x}`),
          'vite',
          'vite-plugin-dts',
          'vite-plugin-eslint'
        ]
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

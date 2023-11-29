import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export const lib = (external?: string[]) =>
  defineConfig((): UserConfig => {
    return {
      build: {
        lib: {
          entry: join(process.cwd(), 'src/index.ts'),
          formats: ['es', 'cjs'],
          fileName: 'index'
        },
        rollupOptions: {
          external
        },
        sourcemap: true
      },
      plugins: [
        dts({
          exclude: 'vite.config.ts'
        })
      ]
    }
  })

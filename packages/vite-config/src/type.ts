import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

export const type = () =>
  defineConfig((): UserConfig => {
    return {
      build: {
        lib: {
          entry: join(process.cwd(), 'src/index.ts'),
          formats: ['es'],
          fileName: 'index'
        }
      },
      plugins: [
        dts({
          rollupTypes: true
        }),
        eslint()
      ]
    }
  })

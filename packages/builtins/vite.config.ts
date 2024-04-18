import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig((): UserConfig => {
  return {
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
      })
    ]
  }
})

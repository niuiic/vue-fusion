import { join } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig((): UserConfig => {
  return {
    build: {
      lib: {
        entry: join(process.cwd(), 'src/index.ts'),
        formats: ['es'],
        fileName: 'index'
      },
      minify: true
    },
    plugins: [stylelint()]
  }
})

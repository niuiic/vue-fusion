import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { join } from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig(({ command }) => {
  const buildOnlyPlugins = command === 'build' ? [eslint(), stylelint()] : []

  return {
    plugins: [vue(), ...buildOnlyPlugins],
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
    },
    css: {
      postcss: {
        plugins: [autoprefixer]
      }
    },
    build: {
      rollupOptions: {
        input: './src/index.ts',
        output: {
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      },
      sourcemap: true
    }
  }
})

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
// @ts-expect-error no declaration
import pxtorem from 'postcss-pxtorem'
import { defineConfig, loadEnv } from 'vite'
import { compression } from 'vite-plugin-compression2'
import viteProjectInfo from 'vite-plugin-project-info'

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const buildOnlyPlugins = command === 'build' ? [ViteImageOptimizer(), compression(), viteProjectInfo(), legacy()] : []

  return {
    plugins: [vue(), ...buildOnlyPlugins],
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
    },
    server: {
      port: 9000
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ['*']
          }),
          removeComments({ removeAll: true })
        ]
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name].[hash].mjs',
          chunkFileNames: 'js/[name].[hash].mjs',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      },
      minify: true
    }
  }
})

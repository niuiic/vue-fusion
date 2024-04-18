import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { viteChunks, viteHtml } from 'dev'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
// @ts-expect-error
import pxtorem from 'postcss-pxtorem'
import { defineConfig, loadEnv } from 'vite'
import { compression } from 'vite-plugin-compression2'
import eslint from 'vite-plugin-eslint'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteProjectInfo from 'vite-plugin-project-info'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const buildOnlyPlugins =
    command === 'build' ? [eslint(), stylelint(), compression(), viteProjectInfo(), ViteImageOptimizer()] : []

  return {
    define: {
      __MOCK__: mode.includes('mock')
    },
    plugins: [
      vue(),
      viteHtml({
        __TITLE__: process.env.VITE_APP_NAME!
      }),
      ...buildOnlyPlugins
    ],
    base: process.env.VITE_BASE_URL,
    server: {
      port: 8080
    },
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
    },
    css: {
      postcss: {
        plugins: [autoprefixer(['chrome > 100']), pxtorem({ rootValue: 12 }), removeComments({ removeAll: true })]
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: viteChunks,
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      }
    }
  }
})

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { viteChunks, viteHtml } from 'build'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
// @ts-expect-error no declaration
import pxtorem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteProjectInfo from 'vite-plugin-project-info'

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const buildOnlyPlugins =
    command === 'build'
      ? [
          compression(),
          viteProjectInfo(),
          ViteImageOptimizer(),
          legacy(),
          AutoImport({
            resolvers: [ElementPlusResolver()],
            dts: false
          }),
          Components({
            resolvers: [ElementPlusResolver()],
            dts: false
          })
        ]
      : []

  return {
    define: {
      __DEV__: mode.includes('dev'),
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
      port: 9000
    },
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
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
          manualChunks: viteChunks,
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      }
    }
  } as UserConfig
})

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { join } from 'path'
import { removeComment, transformPx } from 'postcss-plugins'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import eslint from 'vite-plugin-eslint'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import projectInfoPlugin from 'vite-plugin-project-info'
import stylelint from 'vite-plugin-stylelint'
import topLevelAwait from 'vite-plugin-top-level-await'
import { viteChunks, viteHtml } from 'vite-plugins'

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const buildOnlyPlugins =
    command === 'build'
      ? [
          eslint(),
          stylelint(),
          viteCompression({
            verbose: false,
            threshold: 1025,
            deleteOriginFile: false,
            algorithm: 'gzip',
            ext: '.gz'
          }),
          projectInfoPlugin(),
          ViteImageOptimizer()
        ]
      : []

  return {
    plugins: [
      vue(),
      topLevelAwait(),
      viteHtml({
        __TITLE__: process.env.VITE_APP_SYSTEMNAME!
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
        plugins: [autoprefixer, transformPx, removeComment]
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

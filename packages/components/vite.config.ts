import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
// @ts-expect-error
import pxtorem from 'postcss-pxtorem'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig(({ command }) => {
  const buildOnlyPlugins =
    command === 'build'
      ? [
          eslint(),
          stylelint(),
          dts({
            exclude: ['vite.config.ts', 'cli/**/*.ts']
          }),
          libAssetsPlugin(),
          ViteImageOptimizer()
        ]
      : []

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
        plugins: [
          autoprefixer(['chrome > 100']),
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
          inlineDynamicImports: false,
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: '[ext]/[name].[ext]'
        },
        external: ['vue', 'element-plus', 'styles', 'builtins', 'fx-flow', 'mapbox-gl', 'echarts']
      },
      minify: true,
      lib: {
        entry: join(process.cwd(), 'src/index.ts'),
        formats: ['es']
      },
      sourcemap: true
    }
  }
})

import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { join } from 'path'
// @ts-expect-error
import pxtorem from 'postcss-pxtorem'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig(({ command }) => {
  const buildOnlyPlugins =
    command === 'build'
      ? [
          eslint(),
          stylelint(),
          dts({
            exclude: ['vite.config.ts', 'cli/**/*.ts']
          }),
          libAssetsPlugin()
        ]
      : []

  return {
    plugins: [vue(), topLevelAwait(), ...buildOnlyPlugins],
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
    },
    css: {
      postcss: {
        plugins: [autoprefixer(['chrome > 100']), pxtorem({ rootValue: 12 })]
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

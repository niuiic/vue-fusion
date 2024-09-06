import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(
  (): UserConfig => ({
    resolve: {
      alias: {
        '@': join(process.cwd(), 'src')
      },
      extensions: ['.ts', '.js', '.scss', '.css', '.json']
    },
    plugins: [
      vue(),
      dts({
        exclude: ['vite.config.ts', 'vite.lib.config.ts', 'build.ts']
      }),
      libAssetsPlugin(),
      ViteImageOptimizer(),
      compression()
    ],
    css: {
      postcss: {
        plugins: [removeComments({ removeAll: true })]
      }
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        },
        external: ['vue', 'element-plus', 'mapbox-gl', 'echarts', 'cesium', 'three', 'date-fns']
      },
      minify: true,
      sourcemap: true,
      lib: {
        entry: join(process.cwd(), 'src/index.ts'),
        formats: ['es']
      }
    }
  })
)

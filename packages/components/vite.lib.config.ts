import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ _ }) => ({
  plugins: [
    vue(),
    dts({
      exclude: ['vite.config.ts', 'vite.lib.config.ts', 'build.ts']
    }),
    libAssetsPlugin(),
    ViteImageOptimizer(),
    compression()
  ],
  resolve: {
    alias: {
      '@': join(process.cwd(), 'src')
    },
    extensions: ['.ts', '.js', '.scss', '.css', '.json']
  },
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
        chunkFileNames: 'js/[name].js',
        assetFileNames: '[ext]/[name].[ext]'
      },
      external: ['vue', 'element-plus', 'styles', 'builtins', 'fx-flow', 'mapbox-gl', 'echarts', 'cesium', 'three']
    },
    minify: true,
    lib: {
      entry: join(process.cwd(), 'src/index.ts'),
      formats: ['es']
    },
    sourcemap: true
  }
}))

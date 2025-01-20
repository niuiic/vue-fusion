import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import vue from '@vitejs/plugin-vue'
import { readFileSync, statSync } from 'fs'
import { join } from 'path'
import removeComments from 'postcss-discard-comments'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const getDeps = () => {
  const dependenciesJson = join(process.cwd(), 'dependencies.json')
  if (!statSync(dependenciesJson).isFile()) {
    return []
  }

  return Object.keys(JSON.parse(readFileSync(dependenciesJson).toString()).dependencies)
}

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
        exclude: ['vite.config.ts', 'vite.lib.config.ts', 'build.lib.ts', 'build.doc.ts', 'dependencies.ts']
      }),
      libAssetsPlugin(),
      ViteImageOptimizer(),
      compression()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      },
      postcss: {
        plugins: [removeComments({ removeAll: true })]
      }
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          entryFileNames: 'js/[name].mjs',
          chunkFileNames: 'js/[name].mjs',
          assetFileNames: '[ext]/[name].[ext]'
        },
        external: getDeps()
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

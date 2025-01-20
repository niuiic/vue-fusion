import { collectDeps } from 'dependencies'
import { readdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

collectDeps()

const componentDir = join(process.cwd(), 'src/components')
const entryFile = join(process.cwd(), 'src/index.ts')

const generateEntryFile = () => {
  const components = readdirSync(componentDir)
  const exportContent = components.map((x) => `export * from './components/${x.split('.')[0]}'`).join('\n')
  writeFileSync(entryFile, [exportContent].join('\n'))
}

generateEntryFile()

build({
  configFile: join(process.cwd(), 'vite.lib.config.ts')
})
  .finally(() => rmSync(entryFile))
  .catch(() => {})

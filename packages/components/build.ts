import { readdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build } from 'vite'

const workDir = join(process.cwd(), 'src/components')
const entryFile = join(process.cwd(), 'src/index.ts')

const exportComponents = () => {
  const components = readdirSync(workDir)
  const exportContent = components.map((x) => `export * from './components/${x.split('.')[0]}'`).join('\n')
  writeFileSync(entryFile, exportContent)
}

exportComponents()

build({
  configFile: join(process.cwd(), 'vite.lib.config.ts')
}).finally(() => rmSync(entryFile))
